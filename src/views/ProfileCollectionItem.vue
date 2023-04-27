<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { vIntersectionObserver } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

//Stores
const profileStore = useProfileStore();
// Vars
const isLazyLoading = ref(false);
const root = ref(null);
const error = ref("");
const api = authRequest();
const route = useRoute();
const router = useRouter();
// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    try {
      isLazyLoading.value = true;
      const res = await api.collections.getPhotos({
        collectionId: route.params.collectionId,
        page: profileStore.pageCollectionIndex,
        perPage: 10,
      });
      profileStore.pageCollectionIndex = profileStore.pageCollectionIndex + 1;
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        profileStore.setCollectionsItem([
          ...profileStore.collectionsItem,
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
    <div v-if="error" class="mb-[20px]">{{ error }}</div>
    <div v-else>
      <div class="gallery relative h-full" ref="root">
        <AppPhotosGrid
          :route="{
            name: 'profile-collection-item-photo',
            param: 'photo',
            tab: 'tab-collections',
          }"
          :items="profileStore.collectionsItem"
        />
        <div
          v-if="isLazyLoading"
          class="absolute w-full text-center text-[14px]"
        >
          Загрузка фото...
        </div>
        <div
          class="-z[1] observer bottom-[300px] left-0 h-[100px] w-full"
          v-intersection-observer="[onIntersectionObserver, { root }]"
        ></div>
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
