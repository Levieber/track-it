<script lang="ts">
export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    class="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-800 p-3 text-slate-300"
  >
    <slot />
  </component>
</template>
