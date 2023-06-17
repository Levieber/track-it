import { Task } from "@src/types/Task";
import { defineStore } from "pinia";

type TaskStore = {
  tasks: Task[];
};

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
      return this.tasks.find((t) => t.id === taskId);
    },
    editTask(taskId: string, newContent: Omit<Partial<Task>, "id" | "time">) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      this.tasks[index] = { ...this.tasks[index], ...newContent };
    },
    deleteTask(taskId: string) {
      const index = this.tasks.findIndex((t) => t.id === taskId);
      this.tasks.splice(index, 1);
    },
  },
});
