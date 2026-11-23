-- Groupes d'étude et de prière pour Auréa.
-- À exécuter dans l'éditeur SQL d'un projet Supabase.
-- Dans Authentication > Providers, activer « Allow anonymous sign-ins ».
-- Puis renseigner SUPABASE_URL et SUPABASE_ANON_KEY dans web/config.js.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  pseudo text not null check (char_length(pseudo) between 2 and 30),
  created_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  nom text not null check (char_length(nom) between 3 and 60),
  kind text not null check (kind in ('etude','priere','discussion')),
  description text not null default '' check (char_length(description) <= 140),
  code text not null unique,
  plan jsonb,
  owner uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create table public.messages (
  id bigint generated always as identity primary key,
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null default 'message' check (kind in ('message','intention')),
  body text not null check (char_length(body) between 1 and 1000),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index messages_group_idx on public.messages (group_id, created_at);

create table public.prayed (
  message_id bigint not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (message_id, user_id)
);

create table public.progress (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  week int not null check (week between 1 and 60),
  primary key (group_id, user_id, week)
);

create table public.reports (
  id bigint generated always as identity primary key,
  message_id bigint references public.messages(id) on delete cascade,
  reporter uuid not null references public.profiles(id) on delete cascade,
  reason text not null default '' check (char_length(reason) <= 300),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.groups   enable row level security;
alter table public.members  enable row level security;
alter table public.messages enable row level security;
alter table public.prayed   enable row level security;
alter table public.progress enable row level security;
alter table public.reports  enable row level security;

create or replace function public.is_member(gid uuid) returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from public.members where group_id = gid and user_id = auth.uid()) $$;

-- profiles : chacun voit son pseudo et ceux des personnes qui partagent un groupe avec lui
create policy profiles_select on public.profiles for select to authenticated using (
  id = auth.uid() or exists (
    select 1 from public.members a join public.members b on a.group_id = b.group_id
    where a.user_id = auth.uid() and b.user_id = profiles.id));
create policy profiles_insert on public.profiles for insert to authenticated with check (id = auth.uid());
create policy profiles_update on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- groups : visibles seulement par leurs membres
create policy groups_select on public.groups for select to authenticated using (public.is_member(id));
create policy groups_update on public.groups for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());
create policy groups_delete on public.groups for delete to authenticated using (owner = auth.uid());

-- members : on voit les membres de ses groupes, on peut se retirer soi-même
create policy members_select on public.members for select to authenticated using (public.is_member(group_id));
create policy members_delete on public.members for delete to authenticated using (
  user_id = auth.uid() or exists (select 1 from public.groups g where g.id = group_id and g.owner = auth.uid()));

-- messages : lecture et écriture réservées aux membres
create policy messages_select on public.messages for select to authenticated using (public.is_member(group_id) and not hidden);
create policy messages_insert on public.messages for insert to authenticated with check (public.is_member(group_id) and user_id = auth.uid());
create policy messages_delete on public.messages for delete to authenticated using (
  user_id = auth.uid() or exists (select 1 from public.groups g where g.id = group_id and g.owner = auth.uid()));

create policy prayed_select on public.prayed for select to authenticated using (
  exists (select 1 from public.messages m where m.id = message_id and public.is_member(m.group_id)));
create policy prayed_insert on public.prayed for insert to authenticated with check (
  user_id = auth.uid() and exists (select 1 from public.messages m where m.id = message_id and public.is_member(m.group_id)));
create policy prayed_delete on public.prayed for delete to authenticated using (user_id = auth.uid());

create policy progress_select on public.progress for select to authenticated using (public.is_member(group_id));
create policy progress_insert on public.progress for insert to authenticated with check (user_id = auth.uid() and public.is_member(group_id));
create policy progress_delete on public.progress for delete to authenticated using (user_id = auth.uid());

-- les signalements ne sont lisibles que par l'équipe (via le tableau de bord), jamais par l'application
create policy reports_insert on public.reports for insert to authenticated with check (reporter = auth.uid());

-- création et adhésion passent par des fonctions contrôlées
create or replace function public.create_group(p_nom text, p_kind text, p_description text, p_plan jsonb)
returns public.groups language plpgsql security definer set search_path = public as $$
declare g public.groups; c text; n int := 0;
begin
  if auth.uid() is null then raise exception 'Connexion requise'; end if;
  if (select count(*) from public.groups where owner = auth.uid()) >= 10 then raise exception 'Limite de 10 groupes atteinte'; end if;
  loop
    c := upper(substr(translate(encode(gen_random_bytes(6), 'base64'), '+/=0O1Il', 'XYZ2345'), 1, 6));
    exit when not exists (select 1 from public.groups where code = c);
    n := n + 1; if n > 20 then raise exception 'Impossible de créer un code'; end if;
  end loop;
  insert into public.groups (nom, kind, description, code, plan, owner) values (p_nom, p_kind, coalesce(p_description, ''), c, p_plan, auth.uid()) returning * into g;
  insert into public.members (group_id, user_id, role) values (g.id, auth.uid(), 'owner');
  return g;
end $$;

create or replace function public.join_group(p_code text)
returns public.groups language plpgsql security definer set search_path = public as $$
declare g public.groups;
begin
  if auth.uid() is null then raise exception 'Connexion requise'; end if;
  select * into g from public.groups where code = upper(trim(p_code));
  if not found then raise exception 'Aucun groupe avec ce code'; end if;
  if (select count(*) from public.members where group_id = g.id) >= 30 then raise exception 'Ce groupe est complet'; end if;
  insert into public.members (group_id, user_id) values (g.id, auth.uid()) on conflict do nothing;
  return g;
end $$;

revoke all on function public.create_group(text, text, text, jsonb) from public, anon;
revoke all on function public.join_group(text) from public, anon;
grant execute on function public.create_group(text, text, text, jsonb) to authenticated;
grant execute on function public.join_group(text) to authenticated;
-- gen_random_bytes demande l'extension pgcrypto (activée par défaut sur Supabase)
