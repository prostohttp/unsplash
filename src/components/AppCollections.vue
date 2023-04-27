<script setup>
import { ref } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppCollectionsGrid from "@/components/AppCollectionsGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const root = ref(null);
const isLazyLoading = ref(false);
const error = ref("");
// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    try {
      isLazyLoading.value = true;
      const res = await api.users.getCollections({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabCollectionsIndex,
        perPage: 10,
      });
      profileStore.pageTabCollectionsIndex =
        profileStore.pageTabCollectionsIndex + 1;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else {
        profileStore.setCollections([
          ...profileStore.userCollections,
          ...res.response.results,
        ]);
      }
    } catch (e) {
      error.value = "Ошибка сети";
      console.log(e);
    }
    isLazyLoading.value = false;
  }
};
</script>

<template>
  <div v-if="error" class="text-[18px]">{{ error }}</div>
  <div class="relative h-full" v-else ref="root">
    <AppCollectionsGrid />
    <div v-if="isLazyLoading" class="text-className] text-center">
      Загрузка фото...
    </div>
    <div
      class="-z[1] observer bottom-[300px] left-0 h-[100px] w-full"
      v-intersection-observer="[onIntersectionObserver, { root }]"
    ></div>
  </div>
</template>
