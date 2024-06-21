import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import { router } from "./routes";

createApp(App).use(router).use(createPinia()).mount("#app");
