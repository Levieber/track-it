# Track It

> 🇧🇷 [Leia em português](README.pt-BR.md)

A task and project tracker: time your tasks, group them into projects, and search them. Built with Vue 3 and TypeScript.

## Where it comes from

It started from a project in an [Alura](https://www.alura.com.br/) Vue course. I kept the idea and rebuilt the engineering around it, over 170+ commits, nearly all of them through pull requests:

- **Testing:** E2E tests with Playwright (migrated from Cypress) and component tests with Vitest and Testing Library.
- **CI on every pull request:** lint, type check, component tests, build and E2E, with a cached pnpm store.
- **Dependency updates** handled by Renovate, reviewed as pull requests.
- **Stricter tooling:** `@antfu/eslint-config`, `vue-tsc`, husky and lint-staged on every commit.
- **Different choices from the course:** Pinia instead of Vuex, Tailwind + DaisyUI instead of Bulma, pnpm instead of npm, and a move from the Options API to the Composition API.

## Features

- Create, edit, delete and search tasks, with a timer for each one.
- Create, edit and delete projects.
- Link tasks to projects.
- Light and dark themes.

## Stack

Vue 3 · TypeScript · Vue Router · Pinia · Tailwind CSS · DaisyUI · Vite · Playwright · Vitest · Testing Library

## Running it

You need Node.js (see `mise.toml`) and pnpm (`corepack enable` picks the version in `package.json`).

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
