<script lang="ts">
import { useProjectStore } from "@src/stores/project";
import type { Project } from "@src/types/Project";
import { mapActions } from "pinia";
import type { PropType } from "vue";

import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";

export default {
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  computed: {
    totalTasks() {
      return this.getTotalTasks(this.project.id);
    },
  },
  methods: {
    ...mapActions(useProjectStore, {
      delete: "deleteProject",
      getTotalTasks: "getTotalTasks",
    }),
    deleteProject() {
      const deletionConfirmation = confirm(`Tem certeza de excluir o projeto ${this.project.name}?`);
      if (deletionConfirmation) {
        this.delete(this.project.id);
      }
    },
  },
  components: { IconEdit, IconTrash },
};
</script>

<template>
  <tr>
    <td data-cy="project-name" class="text-xl">
      {{ project.name }}
    </td>
    <td data-cy="project-tasks-quantity" class="text-xl">{{ totalTasks }}</td>
    <td class="flex flex-wrap gap-2">
      <RouterLink
        data-cy="edit-project-link"
        class="btn-info btn"
        :to="{ name: 'edit-project', params: { id: project.id } }"
      >
        <IconEdit /> Editar projeto
      </RouterLink>
      <button data-cy="delete-project-button" @click="deleteProject" class="btn-error btn">
        <IconTrash /> Deletar projeto
      </button>
    </td>
  </tr>
</template>
