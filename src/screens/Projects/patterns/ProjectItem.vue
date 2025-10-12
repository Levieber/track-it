<script setup lang="ts">
import type { Project } from "@src/types/Project";
import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";
import { useProjectStore } from "@src/stores/project";

const { project } = defineProps<{ project: Project }>();

const projectStore = useProjectStore();

function deleteProjectAction() {
  // eslint-disable-next-line no-alert
  const deletionConfirmation = confirm(
    `Tem certeza de excluir o projeto ${project.name}?`,
  );
  if (deletionConfirmation) {
    projectStore.deleteProject(project.id);
  }
}
</script>

<template>
  <tr data-testid="project-item">
    <td data-testid="project-name" class="text-xl">
      {{ project.name }}
    </td>
    <td data-testid="project-tasks-quantity" class="text-xl">
      {{ projectStore.getTotalTasks(project.id) }}
    </td>
    <td class="flex flex-wrap gap-2">
      <RouterLink
        data-testid="edit-project-link"
        class="btn btn-info"
        :to="{ name: 'edit-project', params: { id: project.id } }"
      >
        <IconEdit /> Editar projeto
      </RouterLink>
      <button
        data-testid="delete-project-button"
        class="btn btn-error"
        @click="deleteProjectAction"
      >
        <IconTrash /> Deletar projeto
      </button>
    </td>
  </tr>
</template>
