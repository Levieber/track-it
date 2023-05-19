<script lang="ts">
export default {
  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    elapsedTime() {
      const date = new Date();

      date.setHours(0, 0, this.timeInSeconds, 0);

      return date.toLocaleTimeString();
    },
  },
};
</script>

<template>
  <strong class="text-xl">
    {{ elapsedTime }}
  </strong>
</template>
