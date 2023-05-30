<script lang="ts">
import TaskTimer from "./TaskTimer.vue";
import IconPlay from "./icons/IconPlay.vue";
import IconPause from "./icons/IconPause.vue";

export default {
  components: {
    TaskTimer,
    IconPlay,
    IconPause,
  },
  emits: ["timerFinish"],
  data() {
    return {
      timeInSeconds: 0,
      timerId: 0,
      timerRunning: false,
    };
  },
  methods: {
    startTimer() {
      this.timerRunning = true;
      this.timerId = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000); // 1 second
    },
    stopTimer() {
      this.timerRunning = false;
      clearInterval(this.timerId);
      this.$emit("timerFinish", this.timeInSeconds);
      this.timeInSeconds = 0;
    },
  },
};
</script>

<template>
  <section class="w-full text-center">
    <TaskTimer :time-in-seconds="timeInSeconds" />
  </section>
  <button
    data-cy="start-task"
    :disabled="timerRunning"
    @click="startTimer"
    type="submit"
    class="btn-accent btn flex gap-2 text-black"
  >
    <IconPlay /> Começar
  </button>
  <button
    data-cy="stop-task"
    :disabled="!timerRunning"
    @click="stopTimer"
    type="button"
    class="btn-error btn flex gap-2 text-white"
  >
    <IconPause /> Encerrar
  </button>
</template>
