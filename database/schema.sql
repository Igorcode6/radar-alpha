-- Schema inicial do Supabase para o "Radar de Oportunidades"
-- Sem autenticação obrigatória nesta versão: user_id é opcional (nullable)
-- para permitir uso anônimo hoje e login opcional no futuro.

create table if not exists public.analises (
  id uuid primary key default gen_random_uuid(),
  ticker text not null,
  perfil text not null check (perfil in ('longo_prazo', 'compra_na_queda', 'volatilidade')),
  score numeric(3,1) not null,
  recomendacao text not null check (recomendacao in ('comprar', 'observar', 'evitar')),
  indicadores jsonb not null,
  explicacao text not null,
  origem_analise text not null default 'mock',
  user_id uuid references auth.users(id), -- nullable: uso sem login é permitido
  criado_em timestamptz not null default now()
);

create index if not exists idx_analises_ticker on public.analises (ticker);
create index if not exists idx_analises_criado_em on public.analises (criado_em desc);

-- Estrutura preparada para o sistema de alertas futuro
create table if not exists public.alertas (
  id uuid primary key default gen_random_uuid(),
  ticker text not null,
  perfil text not null,
  score_minimo numeric(3,1) not null default 7.0,
  ativo boolean not null default true,
  user_id uuid references auth.users(id),
  criado_em timestamptz not null default now()
);

-- RLS desabilitado propositalmente no MVP (sem auth obrigatória).
-- Ao introduzir contas de usuário, habilite RLS e adicione policies
-- restringindo leitura/escrita por user_id.
