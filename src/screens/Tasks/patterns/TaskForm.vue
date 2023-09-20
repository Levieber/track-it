<script setup lang="ts">
import TaskTimerManager from "./TaskTimerManager.vue";
import IconSave from "@src/components/icons/IconSave.vue";
import { useProjectStore } from "@src/stores/project";
import { useTaskStore } from "@src/stores/task";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const { editTask, addTask, findTask } = useTaskStore();
const { projects, findProject } = useProjectStore();

const router = useRouter();

const task = reactive({
  title: "",
  time: 0,
  project: "",
});

const { id } = defineProps<{ id?: string }>();

const placeholderText = computed(() => (id ? "Atribua um título a tarefa" : "Qual tarefa deseja realizar?"));

function createTaskAction() {
  addTask({
    id: crypto.randomUUID?.() ?? new Date().toISOString(),
    title: task.title,
    time: task.time,
    project: task.project,
  });
}

function editTaskAction() {
  editTask(String(id), {
    title: task.title,
    time: task.time,
    project: task.project,
  });
}

function saveTask() {
  if (id) {
    editTaskAction();
  } else {
    createTaskAction();
  }

  task.title = "";
  router.push({ name: "tasks" });
}

onMounted(() => {
  if (id) {
    const storagedTask = findTask(String(id));

    if (storagedTask) {
      task.title = storagedTask.title;
      task.time = storagedTask.time;
      task.project = (storagedTask.project && findProject(task.project)?.id) ?? "";
    }
  }
});
</script>

<template>
  <form @submit.prevent="saveTask" class="flex flex-col flex-wrap items-center justify-center gap-3">
    <input
      v-model="task.title"
      :data-cy="id ? 'edit-task' : 'create-task'"
      class="input input-bordered w-full max-w-md"
      type="text"
      :placeholder="placeholderText"
      aria-label="Criar tarefa"
    />
    <select data-cy="link-project" v-model="task.project" class="select select-bordered w-full max-w-md">
      <option value="" selected>Sem projeto</option>
      <option v-for="project of projects" :key="project.id" :value="project.id">
        {{ project.name }}
      </option>
    </select>
    <TaskTimerManager
      :initial-time="findTask(String(id))?.time"
      @timer-finish="(timeInSeconds: number) => (task.time = timeInSeconds)"
    />
    <button data-cy="save-task-button" class="btn btn-accent btn-block max-w-lg text-black">
      <IconSave /> Salvar
    </button>
  </form>
</template>
