<script lang="ts">
import { mapStores } from "pinia";
import TaskTimerManager from "./TaskTimerManager.vue";
import { useTaskStore } from "@src/stores/task";
import IconSave from "@src/components/icons/IconSave.vue";

export default {
  components: {
    TaskTimerManager,
    IconSave,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      taskTitle: "",
      time: 0,
    };
  },
  computed: {
    ...mapStores(useTaskStore),
    placeholderText() {
      return this.id ? "Atribua um título a tarefa" : "Qual tarefa deseja realizar?";
    },
  },
  methods: {
    saveTask() {
      if (this.id) {
        this.taskStore.editTask(String(this.id), {
          title: this.taskTitle,
          time: this.time,
        });
      } else {
        this.taskStore.addTask({
          id: crypto.randomUUID?.() ?? new Date().toISOString(),
          title: this.taskTitle,
          time: this.time,
        });
      }

      this.taskTitle = "";
      this.$router.push({ name: "tasks" });
    },
  },
  mounted() {
    if (this.id) {
      const task = this.taskStore.findTask(String(this.id));

      this.taskTitle = task?.title ?? "";
      this.time = task?.time ?? 0;
    }
  },
};
</script>

<template>
  <form @submit.prevent="saveTask" class="flex flex-col flex-wrap items-center justify-center gap-3">
    <input
      v-model="taskTitle"
      :data-cy="id ? 'edit-task' : 'create-task'"
      class="input-bordered input w-full max-w-lg"
      type="text"
      :placeholder="placeholderText"
      aria-label="Criar tarefa"
    />
    <TaskTimerManager
      :initial-time="id ? taskStore.findTask(String(id))?.time || 0 : 0"
      @timer-finish="(timeInSeconds: number) => time = timeInSeconds"
    />
    <button data-cy="save-task-button" class="btn-accent btn-block btn max-w-lg text-black">
      <IconSave /> Salvar
    </button>
  </form>
</template>
