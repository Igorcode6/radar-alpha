import { createClient } from "@supabase/supabase-js";

// As variáveis de ambiente precisam ser configuradas em .env.local
// (veja .env.example). Sem autenticação obrigatória nesta versão:
// usamos a anon key apenas para leitura/escrita de dados públicos
// (histórico de análises, cache de indicadores, alertas futuros).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Evita quebrar o build local quando as variáveis ainda não existem.
// Em produção, configure as variáveis reais antes do deploy.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
