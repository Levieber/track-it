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
	},
});
