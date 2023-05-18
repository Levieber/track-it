<script lang="ts">
export default {
  data() {
    return {
      darkMode: matchMedia("(prefers-dark-mode)").matches
    }
  },
  methods: {
    toggleTheme() {
      document.documentElement.dataset.theme = this.darkMode ? "dark" : "light"
      this.darkMode = !this.darkMode
    }
  }
}
</script>

<template>
  <header class="flex justify-between items-center p-3 bg-sky-900">
    <h1 class="text-2xl text-white">Track It</h1>
    <button class="btn bg-transparent border-white text-white" @click="toggleTheme">
      Ativar {{ darkMode ? "modo escuro" : "modo claro" }}
    </button>
  </header>
</template>

