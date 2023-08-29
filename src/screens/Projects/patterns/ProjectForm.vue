<script lang="ts">
import { useProjectStore } from "@src/stores/project";
import IconSave from "@src/components/icons/IconSave.vue";
import { mapStores } from "pinia";

export default {
  components: { IconSave },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      projectName: "",
    };
  },
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    saveProject() {
      if (this.projectName.trim() === "") {
        alert("O nome do projeto não pode ser somente espaços!");
        this.projectName = "";
        return;
      }

      if (this.id) {
        this.projectStore.editProject(this.id, {
          name: this.projectName,
        });
      } else {
        this.projectStore.addProject({
          id: crypto.randomUUID?.() || new Date().toISOString(),
          name: this.projectName,
        });
      }

      this.projectName = "";
      this.$router.push({ name: "projects" });
    },
  },
  mounted() {
    if (this.id) {
      const project = this.projectStore.findProject(String(this.id));

      this.projectName = project?.name ?? "";
    }
  },
};
</script>

<template>
  <form @submit.prevent="saveProject" class="flex flex-col flex-wrap items-center justify-center gap-3">
    <input
      :data-cy="id ? 'edit-project' : 'create-project'"
      required
      v-model="projectName"
      placeholder="Qual projeto deseja criar?"
      type="text"
      class="input input-bordered w-full max-w-xl"
    />
    <button data-cy="save-project-button" class="btn btn-accent btn-block max-w-lg text-black">
      <IconSave /> Salvar
    </button>
  </form>
</template>
