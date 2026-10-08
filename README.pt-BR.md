# Track It

> 🇺🇸 [Read in English](README.md)

Um gerenciador de tarefas e projetos: cronometre suas tarefas, agrupe-as em projetos e pesquise-as. Feito com Vue 3 e TypeScript.

## De onde veio

Começou a partir de um projeto de um curso de Vue da [Alura](https://www.alura.com.br/). Mantive a ideia e reconstruí a engenharia em volta dela, em mais de 170 commits, quase todos por pull requests:

- **Testes:** testes E2E com Playwright (migrados do Cypress) e testes de componente com Vitest e Testing Library.
- **CI em todo pull request:** lint, checagem de tipos, testes de componente, build e E2E, com cache do store do pnpm.
- **Atualização de dependências** feita pelo Renovate e revisada em pull requests.
- **Ferramentas mais rígidas:** `@antfu/eslint-config`, `vue-tsc`, husky e lint-staged em todo commit.
- **Escolhas diferentes das do curso:** Pinia em vez de Vuex, Tailwind + DaisyUI em vez de Bulma, pnpm em vez de npm, e a migração da Options API para a Composition API.

## Funcionalidades

- Criar, editar, excluir e pesquisar tarefas, com um cronômetro para cada uma.
- Criar, editar e excluir projetos.
- Relacionar tarefas a projetos.
- Temas claro e escuro.

## Stack

Vue 3 · TypeScript · Vue Router · Pinia · Tailwind CSS · DaisyUI · Vite · Playwright · Vitest · Testing Library

## Rodando localmente

Você precisa do Node.js (veja o `mise.toml`) e do pnpm (`corepack enable` usa a versão definida no `package.json`).

```sh
pnpm install
pnpm dev               # http://localhost:3000
```

```sh
pnpm lint              # ESLint
pnpm type:check        # vue-tsc
pnpm test:component    # Vitest + Testing Library
pnpm test:e2e          # Playwright
pnpm build
```
