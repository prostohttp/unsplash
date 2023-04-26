<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

//Stores
const profileStore = useProfileStore();
// Vars
const isLoading = ref(true);
const error = ref("");
const api = authRequest();
const route = useRoute();
const router = useRouter();
// Handlers
// Hooks
onMounted(async () => {
  if (route.params.collectionId) {
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
        console.log("results");
        profileStore.setCollectionsItem(res.response.results);
      } else {
        console.log("not");
        error.value = "Нет фото или все фото по подписке";
      }
    } catch (e) {
      isLoading.value = false;
      error.value = "Ошибка сети";
      console.log(e);
    }
  }
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
      <div class="mb-[30px]">количество фото</div>
      <div class="gallery">
        <AppPhotosGrid
          :route="{
            name: 'profile-collection-item-photo',
            param: 'photo',
            tab: 'tab-collections',
          }"
          :items="profileStore.collectionsItem"
        />
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
