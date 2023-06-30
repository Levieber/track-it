import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import TasksScreen from "@src/screens/Tasks/TasksScreen.vue";
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import TaskList from "@src/screens/Tasks/patterns/TaskList.vue";

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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "underline",
});
