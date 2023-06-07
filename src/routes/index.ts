import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TasksScreen from "@src/screens/Tasks/TasksScreen.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: TasksScreen,
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
