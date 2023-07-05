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
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapStores(useTaskStore),
    isTaskListEmpty() {
      return this.taskStore.tasks.length === 0;
    },
    taskFiltered() {
      const query = new RegExp(this.search, "i");
      return this.taskStore.tasks.filter((t) => query.test(t.title));
    },
  },
};
</script>

<template>
  <section class="flex flex-col items-center gap-5">
    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink
        data-cy="create-task-link"
        class="btn bg-sky-900 text-white hover:bg-sky-700 hover:text-white"
        :to="{ name: 'new-task' }"
      >
        <IconPlus /> Criar tarefa
      </RouterLink>
      <input
        data-cy="search-task"
        aria-label="Buscar tarefa"
        type="text"
        class="input-bordered input"
        placeholder="Busque por uma tarefa"
        v-model="search"
        v-if="taskStore.tasks.length > 0"
      />
    </div>
    <ul class="flex w-full max-w-4xl flex-col gap-3" role="list">
      <li v-for="task of taskFiltered" :key="task.id">
        <TaskItem :task="task" />
      </li>
      <li v-if="isTaskListEmpty">
        <TaskBox>Você não está muito produtivo hoje :( </TaskBox>
      </li>
    </ul>
  </section>
</template>
