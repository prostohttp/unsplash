<script setup>
import { authRequest } from "@/api/unsplash.js";
import { onMounted, ref } from "vue";
import { useProfileStore } from "@/stores/profile.js";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const isLoading = ref(true);
const error = ref("");
// Handlers
// Hooks
onMounted(async () => {
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
</script>

<template>
  <div v-if="isLoading" class="text-[18px]">Загрузка</div>
  <div v-else-if="error" class="text-[18px]">{{ error }}</div>
  <div v-else>Фото профиля</div>
</template>
