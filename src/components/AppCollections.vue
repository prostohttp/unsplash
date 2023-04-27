<script setup>
import { authRequest } from "@/api/unsplash.js";
import { onMounted, onUnmounted, ref } from "vue";
import { useProfileStore } from "@/stores/profile.js";
import AppCollectionsGrid from "@/components/AppCollectionsGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const isLoading = ref(true);
const isLazyLoading = ref(false);

const error = ref("");
// Handlers
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  let modifier = 1;
  if (currentScroll + modifier >= documentHeight) {
    try {
      isLazyLoading.value = true;
      profileStore.pageTabCollectionsIndex =
        profileStore.pageTabCollectionsIndex + 1;
      const res = await api.users.getCollections({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabCollectionsIndex,
        perPage: 10,
      });
      isLoading.value = true;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setCollections([
          ...profileStore.userCollections,
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
    isLazyLoading.value = false;
  }
};
// Hooks
onMounted(async () => {
  document.addEventListener("scroll", scrollHandler);
  if (profileStore.collectionsItem.length) {
    isLoading.value = false;
  } else {
    try {
      const res = await api.users.getCollections({
        username: localStorage.getItem("isAuth"),
        page: profileStore.pageTabCollectionsIndex,
        perPage: 10,
      });
      isLoading.value = false;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setCollections(res.response.results);
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
  <div v-if="isLoading" class="text-[18px]">Загрузка..</div>
  <div v-else-if="error" class="text-[18px]">{{ error }}</div>
  <template v-else>
    <AppCollectionsGrid />
    <div v-if="isLazyLoading" class="text-center text-[14px]">
      Загрузка фото...
    </div>
  </template>
</template>
