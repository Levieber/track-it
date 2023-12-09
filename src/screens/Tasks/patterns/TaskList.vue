<script setup lang="ts">
import TaskItem from "@src/screens/Tasks/patterns/TaskItem.vue";
import TaskBox from "@src/components/BaseBox.vue";
import { useTaskStore } from "@src/stores/task";
import { RouterLink } from "vue-router";
import IconPlus from "@src/components/icons/IconPlus.vue";
import { computed, ref } from "vue";

const search = ref("");

const { tasks } = useTaskStore();

const filteredTasks = computed(() => {
  const query = new RegExp(search.value, "i");
  return tasks.filter((t) => query.test(t.title));
});

const isTaskListEmpty = computed(() => tasks.length <= 0);
</script>

<template>
  <section class="flex flex-col items-center gap-5">
    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink
        data-test="create-task-link"
        class="btn bg-sky-900 text-white hover:bg-sky-700 hover:text-white"
        :to="{ name: 'new-task' }"
      >
        <IconPlus /> Criar tarefa
      </RouterLink>
      <input
        data-test="search-task"
        aria-label="Buscar tarefa"
        type="text"
        class="input input-bordered"
        placeholder="Busque por uma tarefa"
        v-model="search"
        v-if="!isTaskListEmpty"
      />
    </div>
    <ul class="flex w-full max-w-4xl flex-col gap-3" role="list">
      <li v-for="task of filteredTasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
      <li data-test="empty-list-feedback" v-if="isTaskListEmpty">
        <TaskBox>Você não está muito produtivo hoje :( </TaskBox>
      </li>
    </ul>
  </section>
</template>
