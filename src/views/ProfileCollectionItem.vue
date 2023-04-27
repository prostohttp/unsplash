<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

//Stores
const profileStore = useProfileStore();
// Vars
const isLoading = ref(true);
const isLazyLoading = ref(false);
const error = ref("");
const api = authRequest();
const route = useRoute();
const router = useRouter();
// Handlers
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  let modifier = 1;
  if (currentScroll + modifier >= documentHeight) {
    try {
      isLazyLoading.value = true;
      profileStore.pageCollectionIndex = profileStore.pageCollectionIndex + 1;
      const res = await api.collections.getPhotos({
        collectionId: route.params.collectionId,
        page: profileStore.pageCollectionIndex,
        perPage: 10,
      });
      isLoading.value = true;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setCollectionsItem([
          ...profileStore.collectionsItem,
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
  if (route.params.collectionId) {
    if (!profileStore.collectionsItem.length) {
      try {
        const res = await api.collections.getPhotos({
          collectionId: route.params.collectionId,
          page: profileStore.pageCollectionIndex,
          perPage: 10,
        });
        isLoading.value = false;
        if (res.errors) {
          error.value = "Возникла ошибка";
        } else if (res.response.results.length) {
          profileStore.setCollectionsItem(res.response.results);
        } else {
          error.value = "Нет фото или все фото по подписке";
        }
      } catch (e) {
        isLoading.value = false;
        error.value = "Ошибка сети";
        console.log(e);
      }
    }
  }
});
onUnmounted(() => {
  document.removeEventListener("scroll", scrollHandler);
});
</script>

<template>
  <div>
    <h1 class="mb-[15px] mt-[30px] text-[46px] font-bold text-body">
      {{ route.params.collection }}
    </h1>
    <a
      :href="profileStore.userInfo?.links?.html"
      target="_blank"
      class="mb-[50px] inline-flex items-center gap-[10px]"
    >
      <img
        :src="profileStore.userInfo?.profile_image?.small"
        :alt="profileStore.userInfo?.name"
        class="w-[32px] rounded-full"
      />
      <span class="text-[15px] font-medium">
        {{ profileStore.userInfo?.name }}
      </span>
    </a>
    <div v-if="isLoading" class="mb-[20px]">Загрузка</div>
    <div v-else-if="error" class="mb-[20px]">{{ error }}</div>
    <div v-else>
      <div class="gallery">
        <AppPhotosGrid
          :route="{
            name: 'profile-collection-item-photo',
            param: 'photo',
            tab: 'tab-collections',
          }"
          :items="profileStore.collectionsItem"
        />
        <div v-if="isLazyLoading" class="text-center text-[14px]">
          Загрузка фото...
        </div>
      </div>
    </div>
    <a
      href=""
      @click.prevent="router.back()"
      class="underline underline-offset-4"
    >
      Вернуться назад
    </a>
  </div>
</template>
