<script setup lang="ts">
import { useProjectStore } from "@src/stores/project";
import type { Project } from "@src/types/Project";
import IconEdit from "@src/components/icons/IconEdit.vue";
import IconTrash from "@src/components/icons/IconTrash.vue";

const { project } = defineProps<{ project: Project }>();

const { getTotalTasks, deleteProject } = useProjectStore();

function deleteProjectAction() {
  const deletionConfirmation = confirm(`Tem certeza de excluir o projeto ${project.name}?`);
  if (deletionConfirmation) {
    deleteProject(project.id);
  }
}
</script>

<template>
  <tr>
    <td data-cy="project-name" class="text-xl">
      {{ project.name }}
    </td>
    <td data-cy="project-tasks-quantity" class="text-xl">{{ getTotalTasks(project.id) }}</td>
    <td class="flex flex-wrap gap-2">
      <RouterLink
        data-cy="edit-project-link"
        class="btn btn-info"
        :to="{ name: 'edit-project', params: { id: project.id } }"
      >
        <IconEdit /> Editar projeto
      </RouterLink>
      <button data-cy="delete-project-button" @click="deleteProjectAction" class="btn btn-error">
        <IconTrash /> Deletar projeto
      </button>
    </td>
  </tr>
</template>
