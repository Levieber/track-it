<script setup lang="ts">
defineProps<{
  tag?: string
}>()
</script>

<template>
  <component
    :is="tag ?? 'div'"
    class="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-800 p-3 text-slate-300"
  >
    <slot />
  </component>
</template>
