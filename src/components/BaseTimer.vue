<script setup lang="ts">
import { timerFormatter } from "@src/utils/timerFormatter";
import IconClock from "./icons/IconClock.vue";

const { timeInSeconds, withIcon } = defineProps({
  timeInSeconds: {
    type: Number,
    default: 0,
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <strong data-testid="timer" class="flex items-center justify-center gap-1 text-xl">
    <IconClock v-if="withIcon" data-testid="timer-icon" />{{ timerFormatter(timeInSeconds) }}
  </strong>
</template>
