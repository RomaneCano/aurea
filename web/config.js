// Connexion facultative à un serveur Supabase pour les groupes partagés.
// Laisser vide pour le mode aperçu (groupes visibles uniquement sur l'appareil).
// La clé « anon » est publique par conception, la sécurité repose sur les règles RLS de supabase/schema.sql.
const CONFIG = { SUPABASE_URL: "", SUPABASE_ANON_KEY: "" };
