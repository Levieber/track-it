<script setup lang="ts">
import type { Task } from "@src/types/Task";
import TaskTimer from "@src/components/BaseTimer.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { RouterLink } from "vue-router";
import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";
import { useTaskStore } from "@src/stores/task";
import { useProjectStore } from "@src/stores/project";

const { deleteTask  } = useTaskStore();
const { findProject } = useProjectStore();

const { task } = defineProps<{ task: Task }>();

function deleteTaskAction() {
  const deletionConfirmation = confirm(`Tem certeza de excluir a tarefa ${task.title}?`);

  if (deletionConfirmation && task.id) {
    deleteTask(task.id);
  }
}
</script>

<template>
  <TaskBox>
    <strong data-cy="task-title">
      {{ task.title || "Tarefa sem título" }}
    </strong>
    <strong data-cy="task-project" v-if="task.project">
      Projeto {{ findProject(task.project)?.name || "N/D" }}
    </strong>
    <TaskTimer data-cy="task-timer" with-icon :time-in-seconds="task.time" />
    <div class="flex flex-wrap gap-3">
      <RouterLink
        data-cy="edit-task-link"
        class="btn btn-info flex items-center gap-1"
        :to="{ name: 'edit-task', params: { id: task.id } }"
      >
        <IconEdit /> Editar tarefa
      </RouterLink>
      <button data-cy="delete-task-button" @click="deleteTaskAction" class="btn btn-error flex items-center gap-1">
        <IconTrash /> Deletar tarefa
      </button>
    </div>
  </TaskBox>
</template>
