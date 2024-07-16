import { createApp } from "vue";
import { createPinia } from "pinia";
import VueVirtualScroller from 'vue-virtual-scroller'
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
app.use(VueMasonryPlugin);
app.use(router);
app.use(VueVirtualScroller)
app.directive("click-outside", clickOutside);
app.mount("#app");
