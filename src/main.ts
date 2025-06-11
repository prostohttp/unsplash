import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";
// @ts-ignore
import { VueMasonryPlugin } from "vue-masonry/src/masonry.plugin.js";
import { router } from "@/router/";
import App from "./App.vue";
import "!/src/style.css";

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(createPinia());
app.use(VueMasonryPlugin);
app.use(router);
app.mount("#app");
