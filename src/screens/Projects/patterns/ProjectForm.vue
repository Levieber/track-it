<script setup lang="ts">
import type { Project } from "@src/types/Project";
import IconSave from "@src/components/icons/IconSave.vue";
import { useProjectStore } from "@src/stores/project";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { id } = defineProps<{ id?: string }>();
const projectStore = useProjectStore();

const router = useRouter();

const error = ref<{ message: string | null }>({ message: null });
const name = defineModel<string>("projectName", { default: "" });

function editProjectAction({ id, name }: Project) {
  projectStore.editProject(id, {
    name,
  });
}

function createProjectAction({ name }: Omit<Project, "id">) {
  projectStore.addProject({
    id: crypto.randomUUID(),
    name,
  });
}

async function saveProject() {
  if (name.value.trim() === "") {
    error.value.message = "O nome do projeto não pode ser vazio!";
    name.value = "";
    return;
  }

  if (id) {
    editProjectAction({ id, name: name.value });
  }
  else {
    createProjectAction({ name: name.value });
  }

  name.value = "";
  await router.push({ name: "projects" });
}

onMounted(() => {
  name.value = projectStore.findProject(String(id))?.name ?? "";
});
</script>

<template>
  <form
    class="flex flex-col flex-wrap items-center justify-center gap-3"
    @submit.prevent="saveProject"
  >
    <input
      id="project-name"
      v-model="name"
      :data-testid="id ? 'edit-project' : 'create-project'"
      required
      placeholder="Qual projeto deseja criar?"
      type="text"
      class="input input-bordered w-full max-w-xl"
    >
    <p v-if="error.message" aria-errormessage="project-name">
      {{ error.message }}
    </p>
    <button
      data-testid="save-project-button"
      class="btn btn-accent btn-block max-w-lg text-black"
    >
      <IconSave /> Salvar
    </button>
  </form>
</template>
