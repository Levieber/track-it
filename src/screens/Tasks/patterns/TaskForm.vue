<script lang="ts">
import { mapStores } from "pinia";
import TaskTimerManager from "./TaskTimerManager.vue";
import { useTaskStore } from "@src/stores/task";
import IconSave from "@src/components/icons/IconSave.vue";
import { useProjectStore } from "@src/stores/project";

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
      project: "",
    };
  },
  computed: {
    ...mapStores(useTaskStore),
    ...mapStores(useProjectStore),
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
          project: this.project,
        });
      } else {
        this.taskStore.addTask({
          id: crypto.randomUUID?.() ?? new Date().toISOString(),
          title: this.taskTitle,
          time: this.time,
          project: this.project,
        });
      }

      this.taskTitle = "";
      this.$router.push({ name: "tasks" });
    },
  },
  mounted() {
    if (this.id) {
      const task = this.taskStore.findTask(String(this.id));

      if (task) {
        this.taskTitle = task.title;
        this.time = task.time;
        this.project = (task.project && this.projectStore.findProject(task.project)?.id) ?? "";
      }
    }
  },
};
</script>

<template>
  <form @submit.prevent="saveTask" class="flex flex-col flex-wrap items-center justify-center gap-3">
    <input
      v-model="taskTitle"
      :data-cy="id ? 'edit-task' : 'create-task'"
      class="input input-bordered w-full max-w-md"
      type="text"
      :placeholder="placeholderText"
      aria-label="Criar tarefa"
    />
    <select data-cy="link-project" v-model="project" class="select select-bordered w-full max-w-md">
      <option value="" selected>Sem projeto</option>
      <option v-for="project of projectStore.projects" :key="project.id" :value="project.id">
        {{ project.name }}
      </option>
    </select>
    <TaskTimerManager
      :initial-time="taskStore.findTask(String(id))?.time"
      @timer-finish="(timeInSeconds: number) => (time = timeInSeconds)"
    />
    <button data-cy="save-task-button" class="btn btn-accent btn-block max-w-lg text-black">
      <IconSave /> Salvar
    </button>
  </form>
</template>
