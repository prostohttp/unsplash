import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";
import { VueMasonryPlugin } from "vue-masonry/src/masonry.plugin.js";
import { router } from "@/router/";
import App from "./App.vue";
import { clickOutside } from "@/includes/click-outside.js";
import "!/src/style.css";

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(createPinia());
app.use(router);
app.use(VueMasonryPlugin);
app.directive("click-outside", clickOutside);
app.mount("#app");
