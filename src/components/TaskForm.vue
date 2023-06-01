<script lang="ts">
import TaskTimerManager from "./TaskTimerManager.vue";

export default {
  components: {
    TaskTimerManager,
  },
  emits: ["saveTask"],
  data() {
    return {
      taskTitle: "",
    };
  },
  methods: {
    saveTask(timeInSeconds: number) {
      this.$emit("saveTask", {
        id: crypto.randomUUID?.() ?? new Date().toISOString(),
        title: this.taskTitle,
        time: timeInSeconds,
      });
      this.taskTitle = "";
    },
  },
};
</script>

<template>
  <form @submit.prevent class="flex flex-wrap items-center justify-center gap-3">
    <input
      v-model="taskTitle"
      data-cy="create-task"
      class="input-bordered input w-full max-w-lg"
      type="text"
      placeholder="Qual tarefa deseja realizar?"
      aria-label="Criar tarefa"
    />
    <TaskTimerManager @timer-finish="saveTask" />
  </form>
</template>
