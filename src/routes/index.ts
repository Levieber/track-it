import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import TasksScreen from "@src/screens/Tasks/TasksScreen.vue";
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import TaskList from "@src/screens/Tasks/patterns/TaskList.vue";

import ProjectsScreen from "@src/screens/Projects/ProjectsScreen.vue";
import ProjectsView from "@src/screens/Projects/patterns/ProjectsView.vue";
import ProjectForm from "@src/screens/Projects/patterns/ProjectForm.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: {
      name: "tasks",
    },
  },
  {
    path: "/tasks",
    component: TasksScreen,
    children: [
      {
        path: "",
        name: "tasks",
        component: TaskList,
      },
      {
        path: "new",
        name: "new-task",
        component: TaskForm,
      },
      {
        path: ":id",
        name: "edit-task",
        component: TaskForm,
        props: true,
      },
    ],
  },
  {
    path: "/projects",
    component: ProjectsScreen,
    children: [
      {
        path: "",
        name: "projects",
        component: ProjectsView,
      },
      {
        path: "new",
        name: "new-project",
        component: ProjectForm,
      },
      {
        path: ":id",
        name: "edit-project",
        component: ProjectForm,
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "underline",
});
