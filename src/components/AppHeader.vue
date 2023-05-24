<script lang="ts">
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
};
</script>

<template>
  <header class="flex flex-wrap items-center justify-center gap-3 bg-sky-900 p-3 sm:justify-between">
    <h1 class="text-2xl text-white">Track It</h1>
    <button class="btn border-white bg-transparent text-white" @click="toggleTheme">
      Ativar {{ darkMode ? "modo claro" : "modo escuro" }}
    </button>
  </header>
</template>
