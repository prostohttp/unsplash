<script setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const isLazyLoading = ref(false);
const error = ref("");
const isEnd = ref("");
const endTrigger = ref(false);
const target = ref(null);
const observer = shallowRef();
// Handlers
const callback = async (entries) => {
  for (const { isIntersecting } of entries) {
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
        } else if (!profileStore.userPhotos.length) {
          error.value = " Нет фото";
        }
      } catch (e) {
        error.value = "Ошибка сети";
        console.log(e);
      }
      isLazyLoading.value = false;
    }
  }
};
// Hooks
watch(endTrigger, () => {
  if (endTrigger.value) {
    observer.value.disconnect();
  }
});
onMounted(() => {
  observer.value = new IntersectionObserver(callback, {
    threshold: 0,
  });
  observer.value.observe(target.value);
});
</script>

<template>
  <div class="relative">
    <div v-if="error" class="text-[16px]">{{ error }}</div>
    <div class="relative h-full" v-else>
      <AppPhotosGrid
        :items="profileStore.userPhotos"
        :route="{ name: 'profile-photo', param: 'photo', tab: 'tab-photos' }"
      />
      <div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
      <div v-if="isEnd" class="max-w-[1280px] text-center">
        {{ isEnd }}
      </div>
    </div>
    <div
      ref="target"
      class="target absolute bottom-0 -z-[1] h-[500px] w-full"
    ></div>
  </div>
</template>
