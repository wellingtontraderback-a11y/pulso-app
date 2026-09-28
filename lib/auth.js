import { supabase } from "@/lib/supabaseClient";

// Retorna o usuário logado (ou null). Use dentro de useEffect nas páginas
// que precisam saber se há alguém autenticado.
export async function getUsuarioAtual() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function sair() {
  await supabase.auth.signOut();
}
