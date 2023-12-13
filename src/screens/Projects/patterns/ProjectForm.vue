<script setup lang="ts">
import { useProjectStore } from "@src/stores/project";
import IconSave from "@src/components/icons/IconSave.vue";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

const { id } = defineProps<{ id?: string }>();
const projectStore = useProjectStore();

const router = useRouter();

const project = reactive({
  name: "",
});

function editProjectAction() {
  projectStore.editProject(String(id), {
    name: project.name,
  });
}

function createProjectAction() {
  projectStore.addProject({
    id: crypto.randomUUID(),
    name: project.name,
  });
}

async function saveProject() {
  if (project.name.trim() === "") {
    alert("O nome do projeto não pode ser vazio!");
    project.name = "";
    return;
  }

  if (id) {
    editProjectAction();
  } else {
    createProjectAction();
  }

  project.name = "";
  await router.push({ name: "projects" });
}

onMounted(() => {
  project.name = projectStore.findProject(String(id))?.name ?? "";
});
</script>

<template>
  <form class="flex flex-col flex-wrap items-center justify-center gap-3" @submit.prevent="saveProject">
    <input
      v-model="project.name"
      :data-test="id ? 'edit-project' : 'create-project'"
      required
      placeholder="Qual projeto deseja criar?"
      type="text"
      class="input input-bordered w-full max-w-xl"
    />
    <button data-test="save-project-button" class="btn btn-accent btn-block max-w-lg text-black">
      <IconSave /> Salvar
    </button>
  </form>
</template>
