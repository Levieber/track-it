<script lang="ts">
import { PropType } from "vue";
import type { Task } from "@src/types/Task";
import TaskTimer from "@src/components/BaseTimer.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { RouterLink } from "vue-router";
import IconEdit from "@src/components/icons/IconEdit.vue";

export default {
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  components: { TaskTimer, TaskBox, RouterLink, IconEdit },
};
</script>

<template>
  <TaskBox>
    <strong data-cy="task-title" class="max-w-sm break-all">
      {{ task.title || "Tarefa sem título" }}
    </strong>
    <div class="flex flex-wrap gap-3">
      <TaskTimer data-cy="task-timer" with-icon :time-in-seconds="task.time" />
      <RouterLink
        data-cy="edit-task-link"
        class="btn-info btn flex items-center gap-1"
        :to="{ name: 'edit-task', params: { id: task.id } }"
      >
        <IconEdit /> Editar tarefa
      </RouterLink>
    </div>
  </TaskBox>
</template>
