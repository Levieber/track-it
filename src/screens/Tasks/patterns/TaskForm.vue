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
    };
  },
  computed: {
    ...mapStores(useTaskStore),
    placeholderText() {
      return this.id ? "Atribua um título a tarefa" : "Qual tarefa deseja realizar?";
    },
  },
  methods: {
    editTask() {
      this.taskStore.editTask(String(this.id), {
        title: this.taskTitle,
      });
      this.$router.push({
        name: "tasks",
      });
    },
    saveTask(timeInSeconds: number) {
      this.taskStore.addTask({
        id: crypto.randomUUID?.() ?? new Date().toISOString(),
        title: this.taskTitle,
        time: timeInSeconds,
      });
      this.taskTitle = "";
      this.$router.push({ name: "tasks" });
    },
  },
  mounted() {
    if (this.id) {
      this.taskTitle = this.taskStore.findTask(String(this.id))?.title ?? "";
    }
  },
};
</script>

<template>
  <div role="form" class="flex flex-col flex-wrap items-center justify-center gap-3">
    <input
      v-model="taskTitle"
      :data-cy="id ? 'edit-task' : 'create-task'"
      class="input-bordered input w-full max-w-lg"
      type="text"
      :placeholder="placeholderText"
      aria-label="Criar tarefa"
    />
    <TaskTimerManager v-if="!id" @timer-finish="saveTask" />
    <button
      data-cy="finish-edit"
      v-else
      @click="editTask"
      class="btn-accent btn-block btn max-w-lg text-black"
    >
      <IconSave /> Salvar
    </button>
  </div>
</template>
