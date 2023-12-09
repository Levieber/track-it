<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useProjectStore } from "@src/stores/project";
import IconPlus from "@src/components/icons/IconPlus.vue";
import BaseBox from "@src/components/BaseBox.vue";
import ProjectItem from "./ProjectItem.vue";
import { computed, ref } from "vue";

const search = ref("");

const { projects } = useProjectStore();

const isProjectListEmpty = computed(() => projects.length <= 0);
const filteredProjects = computed(() => {
  const query = new RegExp(search.value, "i");
  return projects.filter((p) => query.test(p.name));
});
</script>

<template>
  <section class="flex flex-col items-center gap-5">
    <div class="flex gap-3">
      <RouterLink
        data-test="create-project-link"
        class="btn bg-sky-900 text-white hover:bg-sky-700 hover:text-white"
        :to="{ name: 'new-project' }"
      >
        <IconPlus /> Criar projeto
      </RouterLink>
      <input
        data-test="search-project"
        aria-label="Buscar tarefa"
        type="text"
        class="input input-bordered"
        placeholder="Busque por projetos"
        v-model="search"
        v-if="!isProjectListEmpty"
      />
    </div>
    <div class="w-full max-w-4xl overflow-x-auto">
      <table v-if="!isProjectListEmpty" class="table table-zebra">
        <thead>
          <tr>
            <th class="text-sm">Nome</th>
            <th class="text-sm"><abbr title="Quantidade">Quant.</abbr> Tarefas</th>
            <th class="text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          <ProjectItem v-for="project of filteredProjects" :key="project.id" :project="project" />
        </tbody>
      </table>
      <BaseBox data-test="empty-list-feedback" role="alert" class="w-full" v-else>
        Você ainda não tem um projeto, tente criar um.
      </BaseBox>
    </div>
  </section>
</template>
