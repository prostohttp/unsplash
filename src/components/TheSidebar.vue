<script setup>
import logoSmall from "~/svg/logo-small.svg";
import logoBig from "~/svg/logo-big.svg";
import userPlaceholder from "~/svg/user-placeholder.svg";
import { useProfileStore } from "@/stores/profile.js";
import { authRequest } from "@/api/unsplash.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import HomeActive from "@/components/icons/HomeActive.vue";
import Home from "@/components/icons/Home.vue";
import SearchActive from "@/components/icons/SearchActive.vue";
import Search from "@/components/icons/Search.vue";
import ExploreActive from "@/components/icons/ExploreActive.vue";
import Explore from "@/components/icons/Explore.vue";
import ReelsActive from "@/components/icons/ReelsActive.vue";
import Reels from "@/components/icons/Reels.vue";
import CreateActive from "@/components/icons/CreateActive.vue";
import Create from "@/components/icons/Create.vue";
import MessagesActive from "@/components/icons/MessagesActive.vue";
import Messages from "@/components/icons/Messages.vue";
import NotificationsActive from "@/components/icons/NotificationsActive.vue";
import Notifications from "@/components/icons/Notifications.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const router = useRouter();

// Handlers

// Hooks
onMounted(async () => {
  const username = localStorage.getItem("isAuth");
  if (username) {
    const res = await api.users.get({ username: username });
    if (res.errors) {
      localStorage.removeItem("isAuth");
      await router.push({ name: "auth" });
    } else {
      profileStore.setUser(res.response);
    }
  }
});
</script>

<template>
  <div
    class="fixed bottom-0 left-0 flex h-[50px] w-full items-center justify-evenly gap-[15px] overflow-y-auto border-t border-t-grey bg-white iphone:h-screen iphone:w-[70px] iphone:flex-col iphone:justify-start iphone:gap-[15px] iphone:border-r iphone:border-t-0 iphone:border-grey iphone:pb-[20px] mac:w-[244px] mac:items-start mac:px-[12px] mac:pt-[8px] imac:w-[335px]"
  >
    <router-link
      :to="{ name: 'home' }"
      class="mb-[30px] mt-[48px] hidden iphone:flex mac:mt-[40px] mac:rounded-[8px] mac:pl-[12px]"
    >
      <img :src="logoSmall" alt="logo" class="w-[32px] mac:hidden" />
      <img :src="logoBig" alt="logo" class="hidden h-[40px] mac:block" />
    </router-link>
    <router-link :to="{ name: 'home' }" class="menu-icon">
      <HomeActive />
      <Home />
      <span class="hidden mac:flex">Главная</span>
    </router-link>
    <router-link :to="{ name: 'search' }" class="menu-icon hidden iphone:flex">
      <SearchActive />
      <Search />
      <span class="hidden mac:flex">Поиск</span>
    </router-link>
    <router-link :to="{ name: 'explore' }" class="menu-icon">
      <ExploreActive />
      <Explore />
      <span class="hidden mac:flex">Обзор</span>
    </router-link>
    <router-link :to="{ name: 'reels' }" class="menu-icon">
      <ReelsActive />
      <Reels />
      <span class="hidden mac:flex">Короткие видео</span>
    </router-link>
    <router-link :to="{ name: 'create' }" class="menu-icon">
      <CreateActive />
      <Create />
      <span class="hidden mac:flex">Загрузить</span>
    </router-link>
    <router-link :to="{ name: 'messages' }" class="menu-icon">
      <MessagesActive />
      <Messages />
      <span class="hidden mac:flex">Сообщения</span>
    </router-link>
    <router-link
      :to="{ name: 'notifications' }"
      class="menu-icon hidden iphone:flex"
    >
      <NotificationsActive />
      <Notifications />
      <span class="hidden mac:flex">Уведомления</span>
    </router-link>
    <router-link
      v-if="profileStore.userInfo"
      :to="{
        name: 'profile',
        params: { user: profileStore.userInfo.username },
      }"
      class="menu-icon"
    >
      <img
        :src="profileStore.userInfo.profile_image?.large"
        alt="logo"
        class="w-[24px] rounded-full"
      />
      <span class="hidden mac:flex">Профиль</span>
    </router-link>
    <router-link v-else :to="{ name: 'auth' }" class="menu-icon">
      <img :src="userPlaceholder" alt="logo" class="w-[24px] rounded-full" />
      <span class="hidden mac:flex">Войти</span>
    </router-link>
  </div>
</template>
