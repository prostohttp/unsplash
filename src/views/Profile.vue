<script setup>
import { useProfileStore } from "@/stores/profile.js";

// Stores
const profileStore = useProfileStore();
const { userInfo } = profileStore;
// Vars
// Handlers
// Hooks
</script>

<template>
  <div
    class="flex flex-col gap-[20px] border-b border-grey pb-[40px] iphone:flex-row"
  >
    <div class="flex basis-4/12 justify-center">
      <img
        :src="userInfo.profile_image.large"
        :alt="userInfo.name"
        class="rounded-full"
      />
    </div>
    <div class="flex basis-8/12 flex-col gap-[10px]">
      <h1 class="text-center text-[22px] iphone:text-left">
        {{ userInfo.name }}
      </h1>
      <div>
        <a
          :href="userInfo.links.html"
          target="_blank"
          class="underline underline-offset-4"
          >Страница на сайте Unsplash</a
        >
      </div>
    </div>
  </div>
</template>
