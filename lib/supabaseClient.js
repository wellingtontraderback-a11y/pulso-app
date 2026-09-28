import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente usado no navegador (respeita as regras de segurança do Supabase).
// Para operações administrativas no servidor, crie um cliente separado
// usando SUPABASE_SERVICE_ROLE_KEY dentro de uma rota de API, nunca no front-end.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
