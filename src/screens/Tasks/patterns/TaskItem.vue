<script lang="ts">
import { PropType } from "vue";
import type { Task } from "@src/types/Task";
import TaskTimer from "@src/components/BaseTimer.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { RouterLink } from "vue-router";
import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";
import { mapActions } from "pinia";
import { useTaskStore } from "@src/stores/task";
import { useProjectStore } from "@src/stores/project";

export default {
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  methods: {
    ...mapActions(useTaskStore, {
      delete: "deleteTask",
    }),
    ...mapActions(useProjectStore, {
      getProject: "findProject",
    }),
    deleteTask() {
      const deletionConfirmation = confirm(`Tem certeza de excluir a tarefa ${this.task.title}?`);

      if (deletionConfirmation && this.task.id) {
        this.delete(this.task.id);
      }
    },
  },
  components: { TaskTimer, TaskBox, RouterLink, IconEdit, IconTrash },
};
</script>

<template>
  <TaskBox>
    <strong data-cy="task-title">
      {{ task.title || "Tarefa sem título" }}
    </strong>
    <strong data-cy="task-project" v-if="task.project">
      Projeto {{ getProject(task.project)?.name || "N/D" }}
    </strong>
    <TaskTimer data-cy="task-timer" with-icon :time-in-seconds="task.time" />
    <div class="flex flex-wrap gap-3">
      <RouterLink
        data-cy="edit-task-link"
        class="btn-info btn flex items-center gap-1"
        :to="{ name: 'edit-task', params: { id: task.id } }"
      >
        <IconEdit /> Editar tarefa
      </RouterLink>
      <button data-cy="delete-task-button" @click="deleteTask" class="btn-error btn flex items-center gap-1">
        <IconTrash /> Deletar tarefa
      </button>
    </div>
  </TaskBox>
</template>
