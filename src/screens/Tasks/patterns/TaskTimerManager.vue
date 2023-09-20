<script setup lang="ts">
import TaskTimer from "@src/components/BaseTimer.vue";
import IconPlay from "@src/components/icons/IconPlay.vue";
import IconPause from "@src/components/icons/IconPause.vue";
import { reactive } from "vue";

const { initialTime } = defineProps<{ initialTime?: number }>();

const oneSecond = 1000;

const timer = reactive({
  id: 0,
  timeInSeconds: initialTime || 0,
  startTime: 0,
  running: false,
});

const emit = defineEmits<{
  timerFinish: [timeInSeconds: number];
}>();

function updateTime() {
  const now = Math.floor(Date.now() / oneSecond);
  timer.timeInSeconds = now - +timer.startTime;
}

function startTimer() {
  timer.running = true;
  timer.startTime = Math.floor(Date.now() / oneSecond) - timer.timeInSeconds;
  timer.id = setInterval(() => {
    updateTime();
  });
}

function stopTimer() {
  timer.running = false;
  clearInterval(timer.id);
  emit("timerFinish", timer.timeInSeconds);
}
</script>

<template>
  <section>
    <TaskTimer :time-in-seconds="timer.timeInSeconds" />
  </section>
  <section class="flex flex-wrap justify-center gap-3">
    <button
      data-cy="start-timer"
      :disabled="timer.running"
      @click="startTimer"
      type="button"
      class="btn btn-success flex gap-2 text-black"
    >
      <IconPlay /> {{ initialTime || timer.timeInSeconds > 0 ? "Continuar" : "Começar" }}
    </button>
    <button
      data-cy="stop-timer"
      :disabled="!timer.running"
      @click="stopTimer"
      type="button"
      class="btn btn-error flex gap-2"
    >
      <IconPause /> Pausar
    </button>
  </section>
</template>
