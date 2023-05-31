<script lang="ts">
import { timerFormatter } from "@src/utils/timerFormatter";
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
      const timeFormatted = timerFormatter(this.timeInSeconds);

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
