<script setup>
import { useProfileStore } from "@/stores/profile.js";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();
const logoutHandler = () => {
  localStorage.removeItem("isAuth");
  profileStore.setUser(null);
  profileStore.setPhotos([]);
  profileStore.setLikes([]);
  profileStore.setCollections([]);
  router.push({ name: "auth" });
};
</script>

<template>
  <div class="sticky right-0 top-[10px] text-[14px]">
    <div
      v-if="profileStore.userInfo"
      class="flex h-auto flex-col items-center gap-0 overflow-hidden ipad:flex-row ipad:gap-[40px]"
    >
      <router-link
        :to="{
          name: 'profile',
          params: { user: profileStore.userInfo.username, tab: 0 },
        }"
        class="flex items-center gap-[15px]"
      >
        <img
          :src="profileStore.userInfo.profile_image.large"
          :alt="profileStore.userInfo.name"
          class="w-[56px] rounded-full"
        />
        <div class="flex flex-col">
          <strong>@{{ profileStore.userInfo.username }}</strong>
          <span class="text-dark-grey">
            {{ profileStore.userInfo.name }}
          </span>
        </div>
      </router-link>

      <div>
        <a @click.prevent="logoutHandler" class="cursor-pointer text-blue"
          >Выйти</a
        >
      </div>
    </div>
    <router-link :to="{ name: 'auth' }" custom v-slot="{ navigate }" v-else>
      <button @click="navigate" role="link">Авторизация</button>
    </router-link>
  </div>
</template>
