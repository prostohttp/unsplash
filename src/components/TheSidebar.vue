<script setup>
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import logoSmall from "~/svg/logo-small.svg";
import logoBig from "~/svg/logo-big.svg";
import homeIcon from "~/svg/home-icon.svg";
import createIcon from "~/svg/create-icon.svg";
import exploreIcon from "~/svg/explore-icon.svg";
import messagesIcon from "~/svg/messages-icon.svg";
import notificationsIcon from "~/svg/notifications-icon.svg";
import reelsIcon from "~/svg/reels-icon.svg";
import searchIcon from "~/svg/search-icon.svg";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";

// Stores
const profileStore = useProfileStore();
const { userInfo } = storeToRefs(profileStore);
const { setUser } = profileStore;
// Vars
const api = authRequest();

// Handlers

// Hooks

onBeforeMount(async () => {
  const res = await api.users.get({ username: "mikelecorleone" });
  if (res.errors) {
    console.log("Такого пользователя нет");
  } else {
    setUser(res.response);
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
    <router-link
      :to="{ name: 'home' }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="homeIcon" alt="logo" />
      <span class="hidden mac:flex">Главная</span>
    </router-link>
    <router-link
      :to="{ name: 'search' }"
      class="hidden h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:flex iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="searchIcon" alt="logo" class="fill-black" />
      <span class="hidden mac:flex">Поиск</span>
    </router-link>
    <router-link
      :to="{ name: 'explore' }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="exploreIcon" alt="logo" />
      <span class="hidden mac:flex">Обзор</span>
    </router-link>
    <router-link
      :to="{ name: 'reels' }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="reelsIcon" alt="logo" />
      <span class="hidden mac:flex">Короткие видео</span>
    </router-link>
    <router-link
      :to="{ name: 'create' }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="createIcon" alt="logo" />
      <span class="hidden mac:flex">Загрузить</span>
    </router-link>
    <router-link
      :to="{ name: 'messages' }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="messagesIcon" alt="logo" />
      <span class="hidden mac:flex">Сообщения</span>
    </router-link>
    <router-link
      :to="{ name: 'notifications' }"
      class="hidden h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:flex iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img :src="notificationsIcon" alt="logo" />
      <span class="hidden mac:flex">Уведомления</span>
    </router-link>
    <router-link
      v-if="userInfo.id"
      :to="{ name: 'profile', params: { user: userInfo.id } }"
      class="flex h-full w-[48px] scale-100 items-center justify-center hover:bg-[#f2f2f2] iphone:h-[48px] mac:w-full mac:justify-start mac:gap-[15px] mac:rounded-[8px] mac:p-[12px]"
    >
      <img
        :src="userInfo.profile_image?.large"
        alt="logo"
        class="w-[24px] rounded-full"
      />
      <span class="hidden mac:flex">Профиль</span>
    </router-link>
  </div>
</template>
