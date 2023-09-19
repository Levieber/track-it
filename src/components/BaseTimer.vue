<script setup lang="ts">
import { timerFormatter } from "@src/utils/timerFormatter";
import IconClock from "./icons/IconClock.vue";
import { defineProps } from "vue";

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
  <strong data-cy="timer" class="flex items-center justify-center gap-1 text-xl">
    <IconClock data-cy="timer-icon" v-if="withIcon" />{{ timerFormatter(timeInSeconds) }}
  </strong>
</template>
