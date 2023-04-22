<script setup>
import { useProfileStore } from "@/stores/profile.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

// Stores
const profileStore = useProfileStore();
// Vars
const error = ref("");
const router = useRouter();
// Handlers
const logoutHandler = () => {
  localStorage.removeItem("isAuth");
  profileStore.setUser({});
  router.push({ name: "auth" });
};
// Handlers

// Hooks
</script>

<template>
  <div
    class="flex flex-col gap-[20px] border-b border-grey pb-[40px] iphone:flex-row"
  >
    <div v-if="error" class="flex flex-col gap-[20px]">
      <span class="text-[24px]">{{ error }}</span>
      <router-link
        :to="{ name: 'auth' }"
        class="underline underline-offset-[3px]"
      >
        Авторизоваться
      </router-link>
    </div>
    <template v-else-if="profileStore.userInfo.name">
      <div class="flex basis-4/12 justify-center">
        <img
          :src="profileStore.userInfo.profile_image.large"
          :alt="profileStore.userInfo.name"
          class="rounded-full"
        />
      </div>
      <div class="flex basis-8/12 flex-col gap-[10px]">
        <h1 class="text-center text-[22px] iphone:text-left">
          {{ profileStore.userInfo.name }}
        </h1>
        <div>
          <a
            :href="profileStore.userInfo.links.html"
            target="_blank"
            class="underline underline-offset-4"
            >Страница на сайте Unsplash
          </a>
        </div>
        <button @click="logoutHandler" class="mt-[30px] w-[250px]">
          Выйти из аккаунта
        </button>
      </div>
    </template>
  </div>
</template>
