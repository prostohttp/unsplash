<script setup>
import { computed, onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import Main from "@/layouts/Main.vue";
import logo from "~/svg/logo-big.svg";

// vars
const layouts = [Main];
const layoutRef = shallowRef(Main);
const route = useRoute();
const loading = ref(true);
// Handlers
const layout = computed(() => {
  layouts.forEach((layout) => {
    if (layout.__name === route.meta.layout) layoutRef.value = layout;
  });
  return layoutRef.value;
});
// Hooks
onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <transition name="fade">
    <div
      class="flex h-screen w-screen items-center justify-center"
      v-if="loading"
    >
      <img :src="logo" alt="Россграм" class="h-[60px]" />
    </div>
    <component :is="layout" v-else>
      <router-view />
    </component>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
