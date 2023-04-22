import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/router/";
import App from "./App.vue";
import { clickOutside } from "@/includes/click-outside.js";
import "!/src/style.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.directive("click-outside", clickOutside);
app.mount("#app");
