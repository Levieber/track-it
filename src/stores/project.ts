import type { Project } from "@src/types/Project";
import { defineStore } from "pinia";
import { useTaskStore } from "./task";

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
      const taskStore = useTaskStore();
      const index = this.projects.findIndex((t) => t.id === projectId);
      taskStore.tasks = taskStore.tasks.map((task) =>
        task.project === this.projects[index].id ? { ...task, project: undefined } : task,
      );
      this.projects.splice(index, 1);
    },
    getTotalTasks(projectId: string) {
      const taskStore = useTaskStore();
      const tasksFromProject = taskStore.tasks.filter((t) => t.project === projectId);
      return tasksFromProject.length;
    },
  },
});
