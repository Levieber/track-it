<script lang="ts">
import TaskTimer from "@src/components/BaseTimer.vue";
import IconPlay from "@src/components/icons/IconPlay.vue";
import IconPause from "@src/components/icons/IconPause.vue";

export default {
  components: {
    TaskTimer,
    IconPlay,
    IconPause,
  },
  props: {
    initialTime: {
      type: Number,
    },
  },
  emits: ["timerFinish"],
  data() {
    return {
      timeInSeconds: this.initialTime || 0,
      startTime: 0,
      timerId: 0,
      timerRunning: false,
    };
  },
  methods: {
    startTimer() {
      this.timerRunning = true;
      this.startTime = Math.floor(Date.now() / 1000) - this.timeInSeconds;
      this.timerId = setInterval(() => {
        this.updateTime();
      }, 1000); // 1 second
    },
    stopTimer() {
      this.timerRunning = false;
      clearInterval(this.timerId);
      this.$emit("timerFinish", this.timeInSeconds);
    },
    updateTime() {
      const now = Math.floor(Date.now() / 1000);
      this.timeInSeconds = now - +this.startTime;
    },
  },
};
</script>

<template>
  <section>
    <TaskTimer :time-in-seconds="timeInSeconds" />
  </section>
  <section class="flex flex-wrap justify-center gap-3">
    <button
      data-cy="start-timer"
      :disabled="timerRunning"
      @click="startTimer"
      type="button"
      class="btn-success btn flex gap-2 text-black"
    >
      <IconPlay /> {{ initialTime || timeInSeconds > 0 ? "Continuar" : "Começar" }}
    </button>
    <button
      data-cy="stop-timer"
      :disabled="!timerRunning"
      @click="stopTimer"
      type="button"
      class="btn-error btn flex gap-2"
    >
      <IconPause /> Pausar
    </button>
  </section>
</template>
