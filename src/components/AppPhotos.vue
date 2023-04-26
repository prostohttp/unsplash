<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";
// import { vIntersectionObserver } from "@vueuse/components";

// Stores
const profileStore = useProfileStore();
// Vars
const root = ref(null);
const api = authRequest();
const isLoading = ref(false);
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
      }
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      error.value = "Ошибка сети";
      console.log(e);
    }
  }
};
// const onIntersectionObserver = async ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     console.log("observer");
//     try {
//       profileStore.pageTabPhotosIndex = profileStore.pageTabPhotosIndex + 1;
//       const res = await api.users.getPhotos({
//         username: localStorage.getItem("isAuth"),
//         page: profileStore.pageTabPhotosIndex,
//       });
//       isLoading.value = true;
//       if (res.errors) {
//         error.value = "Возникла ошибка";
//       } else if (res.response.results.length) {
//         profileStore.setPhotos([
//           ...profileStore.userPhotos,
//           ...res.response.results,
//         ]);
//       } else {
//       }
//       isLoading.value = false;
//     } catch (e) {
//       isLoading.value = false;
//       error.value = "Ошибка сети";
//       console.log(e);
//     }
//   }
// };
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
  <div v-else class="relative h-full" ref="root">
    <AppPhotosGrid
      :items="profileStore.userPhotos"
      :route="{ name: 'profile-photo', param: 'photo', tab: 'tab-photos' }"
    />
    <!--    <div-->
    <!--      class="absolute bottom-[300px] -z-[1] h-[50px] w-full"-->
    <!--      v-intersection-observer="[onIntersectionObserver, { root }]"-->
    <!--    ></div>-->
  </div>
</template>
