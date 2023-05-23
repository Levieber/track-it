<script lang="ts">
export default {
  data() {
    return {
      darkMode: matchMedia("(prefers-dark-mode)").matches,
    };
  },
  methods: {
    toggleTheme() {
      document.documentElement.dataset.theme = this.darkMode ? "dark" : "light";
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<template>
  <header class="flex flex-wrap items-center justify-center gap-3 bg-sky-900 p-3 sm:justify-between">
    <h1 class="text-2xl text-white">Track It</h1>
    <button class="btn border-white bg-transparent text-white" @click="toggleTheme">
      Ativar {{ darkMode ? "modo escuro" : "modo claro" }}
    </button>
  </header>
</template>
