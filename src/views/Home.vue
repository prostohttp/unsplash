<script setup>
import { onBeforeMount, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authRequest } from "@/api/unsplash.js";
import AppFeed from "@/components/AppFeed.vue";
import { usePostStore } from "@/stores/post.js";
import UserInfoBlock from "@/components/UserInfoBlock.vue";

// Stores
const postStore = usePostStore();
// Vars
const api = authRequest();
const posts = ref([]);
const error = ref("");
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();

// Handlers
const setImages = async () => {
  try {
    const res = await api.photos.list({ page: postStore.pageIndex });
    if (res.errors) {
      error.value = "Ошибка при загрузке ленты фотографий";
    } else if (res.response.results.length) {
      posts.value = [...posts.value, ...res.response.results];
      postStore.setPosts(posts.value);
      isLoading.value = false;
    } else {
      console.log("Больше картинок нет");
      document.removeEventListener("scroll", scrollHandler);
    }
  } catch (e) {
    console.log(e);
  }
};
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  if (currentScroll === documentHeight) {
    postStore.pageIndex = postStore.pageIndex + 1;
    await setImages();
  }
};

// Hooks
onBeforeMount(async () => {
  if (!postStore.posts.length) {
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
  <div class="flex iphone:gap-[50px]">
    <div class="min-w-[400px]">
      <h2 class="text-center text-[22px]" v-if="error">{{ error }}</h2>
      <div class="text-center text-[22px]" v-else-if="isLoading">
        Загрузка...
      </div>
      <AppFeed v-else :feeds="postStore.posts" :route-name="route.name" />
    </div>
    <div class="relative mt-[12px] hidden flex-col iphone:flex">
      <UserInfoBlock />
    </div>
  </div>
</template>
