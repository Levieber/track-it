<script lang="ts">
import AppHeader from "@src/components/AppHeader.vue";
import { RouterView } from "vue-router";

export default {
  components: {
    AppHeader,
    RouterView,
  },
};
</script>

<template>
  <AppHeader />
  <RouterView />
</template>
