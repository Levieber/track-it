<script lang="ts">
import { PropType } from "vue";
import type { Task } from "@src/types/Task";
import TaskTimer from "@src/components/BaseTimer.vue";
import TaskBox from "@src/components/BaseBox.vue";

export default {
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  components: { TaskTimer, TaskBox },
};
</script>

<template>
  <TaskBox>
    <strong data-cy="task-title">
      {{ task.title || "Tarefa sem título" }}
    </strong>
    <TaskTimer data-cy="task-timer" with-icon :time-in-seconds="task.time" />
  </TaskBox>
</template>
