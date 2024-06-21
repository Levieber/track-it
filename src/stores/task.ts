import type { Task } from "@src/types/Task";
import { defineStore } from "pinia";

interface TaskStore {
  tasks: Task[];
}

export const useTaskStore = defineStore("task", {
  state(): TaskStore {
    return {
      tasks: [],
    };
  },
  actions: {
    addTask(task: Task) {
      this.tasks.unshift(task);
    },
    findTask(taskId: string) {
      return this.tasks.find(t => t.id === taskId);
    },
    editTask(taskId: string, newContent: Omit<Partial<Task>, "id">) {
      const index = this.tasks.findIndex(t => t.id === taskId);
      this.tasks[index] = { ...this.tasks[index], ...newContent };
    },
    deleteTask(taskId: string) {
      const index = this.tasks.findIndex(t => t.id === taskId);
      this.tasks.splice(index, 1);
    },
    linkToProject(projectId: string, taskId: string) {
      const taskIndex = this.tasks.findIndex(t => t.id === taskId);
      this.tasks[taskIndex].project = projectId;
    },
  },
});
