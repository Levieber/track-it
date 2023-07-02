<script lang="ts">
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
};
</script>

<template>
  <section class="flex flex-col gap-5 p-3">
    <h2 class="text-center text-3xl">Seus projetos:</h2>
    <RouterView />
  </section>
</template>
