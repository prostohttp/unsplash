<script setup>
import { ref } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const root = ref(null);
const api = authRequest();
const isLazyLoading = ref(false);
const error = ref("");
// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isLazyLoading.value = true;
    try {
      const res = await api.users.getPhotos({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabPhotosIndex,
      });
      profileStore.pageTabPhotosIndex = profileStore.pageTabPhotosIndex + 1;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setPhotos([
          ...profileStore.userPhotos,
          ...res.response.results,
        ]);
      } else {
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
    <AppPhotosGrid
      :items="profileStore.userPhotos"
      :route="{ name: 'profile-photo', param: 'photo', tab: 'tab-photos' }"
    />
    <div v-if="isLazyLoading" class="text-center text-[14px]">
      Загрузка фото...
    </div>
    <div
      class="-z[1] observer absolute bottom-[300px] left-0 h-[100px] w-full"
      v-intersection-observer="[onIntersectionObserver, { root }]"
    ></div>
  </div>
</template>
