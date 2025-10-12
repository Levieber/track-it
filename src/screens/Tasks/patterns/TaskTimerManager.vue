<script setup lang="ts">
import TaskTimer from "@src/components/BaseTimer.vue";
import IconPause from "@src/components/icons/IconPause.vue";
import IconPlay from "@src/components/icons/IconPlay.vue";
import { reactive } from "vue";

const emit = defineEmits<{
  timerFinish: [timeInSeconds: number];
}>();

const timeInSeconds = defineModel<number>("timeInSeconds", { default: 0 });

const oneSecond = 1000;

const timer = reactive<{
  id: ReturnType<typeof setInterval> | null;
  startTime: number;
  running: boolean;
}>({
  id: null,
  startTime: 0,
  running: false,
});

function updateTime() {
  const now = Math.floor(Date.now() / oneSecond);
  timeInSeconds.value = now - +timer.startTime;
}

function startTimer() {
  timer.running = true;
  timer.startTime = Math.floor(Date.now() / oneSecond) - timeInSeconds.value;
  timer.id = setInterval(() => {
    updateTime();
  }, oneSecond);
}

function stopTimer() {
  timer.running = false;

  if (timer.id)
    clearInterval(timer.id);

  emit("timerFinish", timeInSeconds.value);
}
</script>

<template>
  <section>
    <TaskTimer :time-in-seconds="timeInSeconds" />
  </section>
  <section class="flex flex-wrap justify-center gap-3">
    <button
      data-testid="start-timer"
      :disabled="timer.running"
      type="button"
      class="btn btn-success flex gap-2 text-black"
      @click="startTimer"
    >
      <IconPlay /> {{ timeInSeconds > 0 ? "Continuar" : "Começar" }}
    </button>
    <button
      data-testid="stop-timer"
      :disabled="!timer.running"
      type="button"
      class="btn btn-error flex gap-2"
      @click="stopTimer"
    >
      <IconPause /> Pausar
    </button>
  </section>
</template>
