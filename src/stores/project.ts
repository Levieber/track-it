import { Project } from "@src/types/Project";
import { defineStore } from "pinia";

type ProjectStore = {
  projects: Project[];
};

export const useProjectStore = defineStore("project", {
  state(): ProjectStore {
    return {
      projects: [],
    };
  },
  actions: {
    addProject(project: Project) {
      this.projects.unshift(project);
    },
    findProject(projectId: string) {
      return this.projects.find((t) => t.id === projectId);
    },
    editProject(project: string, newContent: Omit<Partial<Project>, "id">) {
      const index = this.projects.findIndex((t) => t.id === project);
      this.projects[index] = { ...this.projects[index], ...newContent };
    },
    deleteProject(projectId: string) {
      const index = this.projects.findIndex((t) => t.id === projectId);
      this.projects.splice(index, 1);
    },
  },
});
