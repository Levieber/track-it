<script lang="ts">
import TaskItem from "@src/screens/Tasks/patterns/TaskItem.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { mapStores } from "pinia";
import { useTaskStore } from "@src/stores/task";
import { RouterLink } from "vue-router";
import IconPlus from "@src/components/icons/IconPlus.vue";

export default {
  components: {
    TaskItem,
    TaskBox,
    RouterLink,
    IconPlus,
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
  <section class="flex flex-col items-center gap-5">
    <RouterLink
      data-cy="create-task-link"
      class="btn bg-sky-900 text-white hover:bg-sky-700 hover:text-white"
      :to="{ name: 'new-task' }"
      ><IconPlus /> Criar tarefa</RouterLink
    >
    <ul class="flex w-full max-w-4xl flex-col gap-3" role="list">
      <li v-for="task of taskStore.tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
      <li v-if="isTaskListEmpty">
        <TaskBox>Você não está muito produtivo hoje :( </TaskBox>
      </li>
    </ul>
  </section>
</template>
