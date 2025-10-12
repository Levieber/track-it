<script setup lang="ts">
import type { Task } from "@src/types/Task";
import TaskBox from "@src/components/BaseBox.vue";
import TaskTimer from "@src/components/BaseTimer.vue";
import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";
import { useProjectStore } from "@src/stores/project";
import { useTaskStore } from "@src/stores/task";
import { RouterLink } from "vue-router";

const { task } = defineProps<{ task: Task }>();
const taskStore = useTaskStore();
const projectStore = useProjectStore();

function deleteTaskAction() {
  // eslint-disable-next-line no-alert
  const deletionConfirmation = confirm(`Tem certeza de excluir a tarefa ${task.title}?`);

  if (deletionConfirmation && task.id) {
    taskStore.deleteTask(task.id);
  }
}
</script>

<template>
  <TaskBox data-testid="task-item">
    <strong data-testid="task-title">
      {{ task.title || "Tarefa sem título" }}
    </strong>
    <strong data-testid="task-project">
      Projeto {{ task.project ? projectStore.findProject(task.project)?.name : "N/D" }}
    </strong>
    <TaskTimer data-testid="task-timer" with-icon :time-in-seconds="task.time" />
    <div class="flex flex-wrap gap-3">
      <RouterLink
        data-testid="edit-task-link"
        class="btn btn-info flex items-center gap-1"
        :to="{ name: 'edit-task', params: { id: task.id } }"
      >
        <IconEdit /> Editar tarefa
      </RouterLink>
      <button
        data-testid="delete-task-button"
        class="btn btn-error flex items-center gap-1"
        @click="deleteTaskAction"
      >
        <IconTrash /> Deletar tarefa
      </button>
    </div>
  </TaskBox>
</template>
