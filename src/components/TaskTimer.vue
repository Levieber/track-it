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
      const TIME_INDEX_START = 11;
      const TIME_INDEX_END = 19;
      const date = new Date(this.timeInSeconds * 1000);
      const timeFormatted = date.toISOString().substring(TIME_INDEX_START, TIME_INDEX_END);

      return timeFormatted;
    },
  },
  components: { IconClock },
};
</script>

<template>
  <strong data-cy="timer" class="flex items-center justify-center gap-1 text-xl">
    <IconClock v-if="withIcon" />{{ elapsedTime }}
  </strong>
</template>
