<script setup>
import { authRequest } from "@/api/unsplash.js";
import { onMounted, onUnmounted, ref } from "vue";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const isLoading = ref(true);
const error = ref("");
// Handlers
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  let modifier = 1;
  if (currentScroll + modifier >= documentHeight) {
    try {
      profileStore.pageTabPhotosIndex = profileStore.pageTabPhotosIndex + 1;
      const res = await api.users.getPhotos({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabPhotosIndex,
      });
      isLoading.value = true;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setPhotos([
          ...profileStore.userPhotos,
          ...res.response.results,
        ]);
      } else {
        document.removeEventListener("scroll", scrollHandler);
      }
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      error.value = "Ошибка сети";
      console.log(e);
      document.removeEventListener("scroll", scrollHandler);
    }
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
      isLoading.value = false;
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
  }
});
onUnmounted(() => {
  document.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <div v-if="isLoading" class="text-[18px]">Загрузка...</div>
  <div v-else-if="error" class="text-[18px]">{{ error }}</div>
  <div v-else>
    <AppPhotosGrid
      :items="profileStore.userPhotos"
      :route="{ name: 'profile-photo', param: 'photo', tab: 0 }"
    />
  </div>
</template>
