<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue";
import { authRequest } from "@/api/unsplash.js";
import banner from "~/images/banner-rossgram.webp";
import AppFeed from "@/components/AppFeed.vue";
import { usePostStore } from "@/stores/post.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

// Stores
const postStore = usePostStore();
const { setPosts } = postStore;
const { posts: storePosts, pageIndex } = storeToRefs(postStore);
// Vars
const api = authRequest();
const posts = ref([]);
const error = ref("");
const isLoading = ref(true);
const route = useRoute();

// Handlers
const setImages = async () => {
  try {
    const res = await api.photos.list({ page: pageIndex.value });
    if (res.errors) {
      error.value = "Ошибка при загрузке ленты фотографий";
    } else {
      posts.value = [...posts.value, ...res.response.results];
      setPosts(posts.value);
      isLoading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  if (currentScroll === documentHeight) {
    pageIndex.value = pageIndex.value + 1;
    await setImages();
  }
};
// Hooks
onBeforeMount(async () => {
  if (!storePosts.value.length) {
    await setImages();
  } else {
    isLoading.value = false;
  }
  document.addEventListener("scroll", scrollHandler);
});
onUnmounted(async () => {
  document.removeEventListener("scroll", scrollHandler);
});
// Handlers

// Hooks
</script>

<template>
  <div class="flex ipad:gap-[30px]">
    <div class="iphone:m-auto iphone:w-[550px]">
      <h2 class="text-center text-[22px]" v-if="error">{{ error }}</h2>
      <div class="text-center text-[22px]" v-else-if="isLoading">
        Загрузка...
      </div>
      <AppFeed v-else :feeds="storePosts" :route-name="route.name" />
    </div>
    <div class="relative hidden max-w-[319px] flex-col ipad:flex">
      <img
        :src="banner"
        alt="banner"
        class="sticky right-0 top-[10px] h-auto overflow-hidden rounded-[8px] object-contain"
      />
    </div>
  </div>
</template>
