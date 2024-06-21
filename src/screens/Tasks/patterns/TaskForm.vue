<script setup lang="ts">
import IconSave from "@src/components/icons/IconSave.vue";
import { useProjectStore } from "@src/stores/project";
import { useTaskStore } from "@src/stores/task";
import type { Task } from "@src/types/Task";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import TaskTimerManager from "./TaskTimerManager.vue";

const { id } = defineProps<{ id?: string }>();
const router = useRouter();

const taskStore = useTaskStore();
const { projects: savedProjects } = useProjectStore();

const title = defineModel<string>("taskTitle", { default: "" });
const time = defineModel<number>("taskTime", { default: 0 });
const project = defineModel<string>("taskProject", { default: "" });

const placeholderText = computed(() =>
  id ? "Atribua um título a tarefa" : "Qual tarefa deseja realizar?",
);

function createTaskAction({ title, time, project }: Omit<Task, "id">) {
  taskStore.addTask({
    id: crypto.randomUUID(),
    title,
    time,
    project,
  });
}

function editTaskAction({ id, title, time, project }: Task) {
  taskStore.editTask(id, {
    title,
    time,
    project,
  });
}

async function saveTask() {
  if (id) {
    editTaskAction({
      id,
      title: title.value,
      time: time.value,
      project: project.value,
    });
  }
  else {
    createTaskAction({
      title: title.value,
      time: time.value,
      project: project.value,
    });
  }

  title.value = "";
  project.value = "";
  time.value = 0;
  await router.push({ name: "tasks" });
}

function updateTaskTime(timeInSeconds: number) {
  time.value = timeInSeconds;
}

onMounted(() => {
  if (id) {
    const storagedTask = taskStore.findTask(id);

    if (storagedTask) {
      title.value = storagedTask.title;
      time.value = storagedTask.time;
      project.value = storagedTask.project || "";
    }
  }
});
</script>

<template>
  <form
    class="flex flex-col flex-wrap items-center justify-center gap-3"
    @submit.prevent="saveTask"
  >
    <input
      v-model="title"
      :data-test="id ? 'edit-task' : 'create-task'"
      class="input input-bordered w-full max-w-md"
      type="text"
      :placeholder="placeholderText"
      aria-label="Criar tarefa"
    >
    <select
      v-model="project"
      data-test="link-project"
      class="select select-bordered w-full max-w-md"
    >
      <option value="" selected>
        Sem projeto
      </option>
      <option
        v-for="savedProject of savedProjects"
        :key="savedProject.id"
        :value="savedProject.id"
      >
        {{ savedProject.name }}
      </option>
    </select>
    <TaskTimerManager :time-in-seconds="time" @timer-finish="updateTaskTime" />
    <button
      data-test="save-task-button"
      class="btn btn-accent btn-block max-w-lg text-black"
    >
      <IconSave /> Salvar
    </button>
  </form>
</template>
