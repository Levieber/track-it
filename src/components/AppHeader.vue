<script lang="ts">
import IconTask from "./icons/IconTask.vue";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      darkMode: matchMedia("(prefers-color-scheme: dark)").matches,
    };
  },
  methods: {
    toggleTheme() {
      document.documentElement.dataset.theme = this.darkMode ? "light" : "dark";
      this.darkMode = !this.darkMode;
    },
  },
  components: { RouterLink, IconTask },
};
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-center gap-3 bg-sky-900 p-3 text-white sm:justify-between"
  >
    <h1 class="text-2xl">Track It</h1>
    <nav class="flex w-full justify-center md:w-auto">
      <RouterLink
        title="Voltar para a listagem"
        class="flex items-center gap-1 text-lg"
        :to="{ name: 'tasks' }"
      >
        <IconTask />Tarefas
      </RouterLink>
    </nav>
    <button class="btn-neutral btn" @click="toggleTheme">
      Ativar {{ darkMode ? "modo claro" : "modo escuro" }}
    </button>
  </header>
</template>
