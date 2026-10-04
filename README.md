# Radar de Oportunidades

MVP de análise de ações brasileiras com recomendações por perfil de investidor.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase

## Estrutura de pastas

```
acao-radar/
├── app/
│   ├── page.tsx              → Landing page
│   ├── analysis/page.tsx     → Página de análise (interativa)
│   ├── api/analyze-stock/    → Endpoint POST /api/analyze-stock
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── ProfileSelector.tsx   → Seleção de perfil de investidor
│   ├── StockCard.tsx         → Card de resultado por ação
│   └── RadarSweep.tsx        → Visual de assinatura da landing
├── services/                 → Lógica de negócio
│   ├── marketData.ts         → Hoje: mock. Trocar aqui por API real.
│   ├── scoring.ts            → Cálculo do score 0-10 por perfil
│   ├── explicacao.ts         → Geração da explicação em texto simples
│   ├── stockAnalysis.ts      → Orquestrador principal
│   └── aiProvider.ts         → Placeholder para IA (OpenAI/Claude)
├── lib/
│   ├── types.ts              → Tipos centrais do domínio
│   ├── perfis.ts              → Metadados dos 3 perfis
│   ├── mockData.ts           → Dados mock de PETR4, VALE3, ITUB4, WEGE3, BBAS3
│   └── supabase.ts           → Cliente Supabase
└── database/
    └── schema.sql            → Schema para histórico de análises e alertas
```

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```
   Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   com os dados do seu projeto Supabase (crie um gratuito em supabase.com).
   O app funciona mesmo sem essas variáveis — o Supabase só é usado para
   histórico de análises, ainda não obrigatório no MVP.

3. (Opcional) Rode o schema do banco:
   No painel do Supabase, abra o SQL Editor e cole o conteúdo de
   `database/schema.sql`.

4. Suba o projeto:
   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Endpoint da API

`POST /api/analyze-stock`

```json
{
  "tickers": ["PETR4", "VALE3", "ITUB4"],
  "perfil": "longo_prazo"
}
```

Perfis aceitos: `longo_prazo`, `compra_na_queda`, `volatilidade`.

`GET /api/analyze-stock` retorna os tickers e perfis disponíveis, útil para
testar rapidamente no navegador.

## Próximos passos (pós-MVP)

- Trocar `services/marketData.ts` por uma API de dados reais (ex: Brapi, B3)
- Implementar `services/aiProvider.ts` para explicações geradas por IA
- Sistema de alertas (tabela `alertas` já preparada em `database/schema.sql`)
- Autenticação opcional de usuários (para salvar histórico e alertas)
