<script setup>
import { useProfileStore } from "@/stores/profile.js";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();
const logoutHandler = () => {
  localStorage.removeItem("isAuth");
  profileStore.setUser(null);
  router.push({ name: "auth" });
};
</script>

<template>
  <div class="sticky right-0 top-[10px] text-[14px]">
    <div
      v-if="profileStore.userInfo"
      class="flex h-auto items-center gap-[40px] overflow-hidden"
    >
      <router-link
        :to="{
          name: 'profile',
          params: { user: profileStore.userInfo.username },
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
