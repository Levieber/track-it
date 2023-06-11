<script lang="ts">
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import TaskItem from "@src/screens/Tasks/patterns/TaskItem.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { mapStores } from "pinia";
import { useTaskStore } from "@src/stores/task";

export default {
  components: {
    TaskForm,
    TaskItem,
    TaskBox,
  },
  computed: {
    ...mapStores(useTaskStore),
    isTaskListEmpty() {
      return this.taskStore.tasks.length === 0;
    },
  },
};
</script>

<template>
  <section class="flex flex-col gap-5 p-3">
    <h2 class="text-center text-3xl">Suas tarefas:</h2>
    <TaskForm @save-task="taskStore.addTask" />
    <ul class="flex flex-col items-center gap-3" role="list">
      <li class="w-full max-w-5xl" v-for="task of taskStore.tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
      <li class="w-full max-w-5xl" v-if="isTaskListEmpty">
        <TaskBox>Você não está muito produtivo hoje :( </TaskBox>
      </li>
    </ul>
  </section>
</template>
