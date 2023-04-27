<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { vIntersectionObserver } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import AppFeed from "@/components/AppFeed.vue";
import { usePostStore } from "@/stores/post.js";
import UserInfoBlock from "@/components/AppUserInfoBlock.vue";

// Stores
const postStore = usePostStore();
// Vars
const api = authRequest();
const root = ref(null);
const posts = ref([]);
const error = ref("");
const route = useRoute();
const router = useRouter();

// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    try {
      const res = await api.photos.list({ page: postStore.pageIndex });
      postStore.pageIndex = postStore.pageIndex + 1;
      if (res.errors) {
        error.value = "Ошибка при загрузке ленты фотографий";
      } else if (res.response.results.length) {
        posts.value = [...posts.value, ...res.response.results];
        postStore.setPosts(posts.value);
      } else {
        console.log("Больше картинок нет");
      }
    } catch (e) {
      console.log(e);
    }
  }
};
// Hooks
</script>

<template>
  <div class="flex iphone:gap-[50px]">
    <div class="relative h-full min-w-[400px]" ref="root">
      <h2 class="text-center text-[22px]" v-if="error">{{ error }}</h2>
      <AppFeed v-else :feeds="postStore.posts" :route-name="route.name" />
      <div
        class="-z[1] observer bottom-[300px] left-0 h-[300px] w-full"
        v-intersection-observer="[onIntersectionObserver, { root }]"
      ></div>
    </div>
    <div class="relative mt-[12px] hidden flex-col iphone:flex">
      <UserInfoBlock />
    </div>
  </div>
</template>
