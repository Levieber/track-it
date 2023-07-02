<script lang="ts">
import { mapStores } from "pinia";
import { RouterLink } from "vue-router";
import { useProjectStore } from "@src/stores/project";

import IconPlus from "@src/components/icons/IconPlus.vue";
import BaseBox from "@src/components/BaseBox.vue";
import ProjectItem from "./ProjectItem.vue";

export default {
  components: {
    RouterLink,
    BaseBox,
    IconPlus,
    ProjectItem,
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapStores(useProjectStore),
    isProjectListEmpty() {
      return this.projectStore.projects.length === 0;
    },
    filteredProjects() {
      const query = new RegExp(this.search, "i");
      return this.projectStore.projects.filter((p) => query.test(p.name));
    },
  },
};
</script>

<template>
  <section class="flex flex-col items-center gap-5">
    <div class="flex gap-3">
      <RouterLink
        data-cy="create-project-link"
        class="btn bg-sky-900 text-white hover:bg-sky-700 hover:text-white"
        :to="{ name: 'new-project' }"
      >
        <IconPlus /> Criar projeto
      </RouterLink>
      <input
        data-cy="search-project"
        aria-label="Buscar tarefa"
        type="text"
        class="input-bordered input"
        placeholder="Busque por projetos"
        v-model="search"
        v-if="projectStore.projects.length > 0"
      />
    </div>
    <div class="w-full max-w-4xl overflow-x-auto">
      <table v-if="!isProjectListEmpty" class="table-zebra table">
        <thead>
          <tr>
            <th class="text-sm">Nome</th>
            <th class="text-sm">Ações</th>
          </tr>
        </thead>
        <tbody>
          <ProjectItem v-for="project of filteredProjects" :key="project.id" :project="project" />
        </tbody>
      </table>
      <BaseBox role="alert" class="w-full" v-else>Você ainda não tem um projeto, tente criar um.</BaseBox>
    </div>
  </section>
</template>
