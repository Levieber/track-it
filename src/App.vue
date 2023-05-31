<script lang="ts">
import AppHeader from "@src/components/AppHeader.vue";
import TaskForm from "@src/components/TaskForm.vue";
import type { Task } from "@src/types/Task";
import TaskItem from "@src/components/TaskItem.vue";
import TaskBox from "@src/components/TaskBox.vue";

export default {
  components: {
    AppHeader,
    TaskForm,
    TaskItem,
    TaskBox,
  },
  data() {
    return {
      tasks: [] as Task[],
    };
  },
  computed: {
    isTaskListEmpty() {
      return this.tasks.length === 0;
    },
  },
  methods: {
    createTask(task: Task) {
      this.tasks.unshift(task);
    },
  },
};
</script>

<template>
  <AppHeader />
  <section class="flex flex-col gap-5 p-3">
    <h2 class="text-center text-3xl">Suas tarefas:</h2>
    <TaskForm @save-task="createTask" />
    <ul class="flex flex-col items-center gap-3" role="list">
      <li class="w-full max-w-5xl" v-for="task of tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
      <li class="w-full max-w-5xl" v-if="isTaskListEmpty">
        <TaskBox>Você não está muito produtivo hoje :( </TaskBox>
      </li>
    </ul>
  </section>
</template>
