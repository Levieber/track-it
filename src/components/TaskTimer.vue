<script lang="ts">
import IconClock from "./icons/IconClock.vue";

export default {
  props: {
    timeInSeconds: {
      type: Number,
      default: 0,
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    elapsedTime() {
      const date = new Date();

      date.setHours(0, 0, this.timeInSeconds, 0);

      return date.toLocaleTimeString();
    },
  },
  components: { IconClock },
};
</script>

<template>
  <strong class="text-xl flex items-center justify-center gap-1">
    <IconClock v-if="withIcon" />
    {{ elapsedTime }}
  </strong>
</template>
