<script setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

//Stores
const profileStore = useProfileStore();
// Vars
const error = ref("");
const api = authRequest();
const route = useRoute();
const router = useRouter();
const isLazyLoading = ref(false);
const isEnd = ref("");
const endTrigger = ref(false);
const target = ref(null);
const observer = shallowRef();
// Handlers
const callback = async (entries) => {
  for (const { isIntersecting } of entries) {
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
        } else if (
          !res.response.results.length &&
          !profileStore.collectionsItem.length
        ) {
          error.value = "Нет фото или все фото по подписке";
          endTrigger.value = true;
        } else if (res.response.results.length) {
          profileStore.setCollectionsItem([
            ...profileStore.collectionsItem,
            ...res.response.results,
          ]);
        } else if (
          !res.response.results.length &&
          profileStore.collectionsItem.length
        ) {
          endTrigger.value = true;
          isEnd.value = "Фото больше нет";
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
  profileStore.pageCollectionIndex = 1;
  profileStore.setCollectionsItem([]);
});
</script>

<template>
  <div class="relative">
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
        <div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
        <div v-if="isEnd" class="max-w-[1280px] text-center">
          {{ isEnd }}
        </div>
      </div>
    </div>
    <div
      ref="target"
      class="target absolute bottom-0 -z-[1] h-[100px] w-full"
    ></div>
    <a
      href=""
      @click.prevent="router.back()"
      class="underline underline-offset-4"
    >
      Вернуться назад
    </a>
  </div>
</template>
