<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const root = ref(null);
const api = authRequest();
const isLoading = ref(false);
const isLazyLoading = ref(false);
const error = ref("");
// Handlers
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  let modifier = 1;
  if (currentScroll + modifier >= documentHeight) {
    isLazyLoading.value = true;
    try {
      profileStore.pageTabPhotosIndex = profileStore.pageTabPhotosIndex + 1;
      const res = await api.users.getPhotos({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabPhotosIndex,
      });
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
// Hooks
onMounted(async () => {
  document.addEventListener("scroll", scrollHandler);
  if (profileStore.userPhotos.length) {
    isLoading.value = false;
  } else {
    try {
      const res = await api.users.getPhotos({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabPhotosIndex,
      });
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setPhotos(res.response.results);
      } else {
        error.value = "Фото пока что нет";
      }
    } catch (e) {
      isLoading.value = false;
      console.log(e);
    }
    isLoading.value = false;
  }
});
onUnmounted(() => {
  document.removeEventListener("scroll", scrollHandler);
});
// Observer
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(
        "Элемент пересек границу области и все еще соприкасается с ней"
      );
      observer.unobserve(entry.target);
    }
  });
};
const options = {
  threshold: 1,
};
const observer = new IntersectionObserver(callback, options);
</script>

<template>
  <div v-if="isLoading" class="text-[18px]">Загрузка...</div>
  <div v-else-if="error" class="text-[18px]">{{ error }}</div>
  <div v-else class="relative h-full" ref="root">
    <AppPhotosGrid
      :items="profileStore.userPhotos"
      :route="{ name: 'profile-photo', param: 'photo', tab: 'tab-photos' }"
    />
    <div v-if="isLazyLoading" class="text-center text-[14px]">
      Загрузка фото...
    </div>
  </div>
</template>
