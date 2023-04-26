<script setup>
import { useProfileStore } from "@/stores/profile.js";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppTabs from "@/components/AppTabs.vue";
import AppPhotos from "@/components/AppPhotos.vue";
import AppLikes from "@/components/AppLikes.vue";
import AppCollections from "@/components/AppCollections.vue";
import TotalPhotos from "@/components/icons/TotalPhotos.vue";
import TotalLikes from "@/components/icons/TotalLikes.vue";
import TotalCollections from "@/components/icons/TotalCollections.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const error = ref("");
const router = useRouter();
const route = useRoute();
const tabTitles = [
  {
    label: "Фото",
    name: "tab-photos",
    count: "total_photos",
    icon: TotalPhotos,
  },
  {
    label: "Лайки",
    name: "tab-likes",
    count: "total_likes",
    icon: TotalLikes,
  },
  {
    label: "Коллекции",
    name: "tab-collections",
    count: "total_collections",
    icon: TotalCollections,
  },
];
const tabContents = [AppPhotos, AppLikes, AppCollections];
const activeTab = ref(0);
// Handlers
const logoutHandler = () => {
  localStorage.removeItem("isAuth");
  profileStore.resetState();
  router.push({ name: "auth" });
};
const changeTab = (index) => {
  activeTab.value = index;
  router.push({
    name: "profile",
    params: {
      user: profileStore.userInfo.username,
      tab: tabTitles[index].name,
    },
  });
};
// Hooks
onMounted(() => {
  const tab = route.params.tab;
  if (tab) {
    if (tabTitles.some((item) => item.name === tab)) {
      activeTab.value = tabTitles.findIndex((el) => el.name === tab);
    }
  } else {
    activeTab.value = 0;
    router.push({
      name: "profile",
      params: {
        user: profileStore.userInfo?.username,
        tab: tabTitles[activeTab.value].name,
      },
    });
  }
});
</script>

<template>
  <div
    class="mb-[80px] flex flex-col items-center gap-[20px] iphone:flex-row iphone:items-start"
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
    <template v-else>
      <div
        class="flex basis-3/12 justify-center iphone:mt-0 ipad:basis-2/12 imac:basis-1/12"
      >
        <img
          :src="profileStore.userInfo?.profile_image.large"
          :alt="profileStore.userInfo?.name"
          class="rounded-full"
        />
      </div>
      <div
        class="flex basis-9/12 flex-col items-center iphone:items-start ipad:basis-10/12 imac:basis-11/12"
      >
        <h1 class="text-center text-[40px] font-bold iphone:text-left">
          {{ profileStore.userInfo?.name }}
        </h1>
        <div class="text-center iphone:text-left">
          <a
            :href="profileStore.userInfo?.links.html"
            target="_blank"
            class="underline underline-offset-4"
            >Перейти на unsplash.com
          </a>
        </div>
        <button @click="logoutHandler" class="mt-[20px] w-[250px]">
          Выйти из аккаунта
        </button>
      </div>
    </template>
  </div>
  <AppTabs
    v-if="profileStore.userInfo?.id"
    :content="tabContents[activeTab]"
    :titles="tabTitles"
    :active-tab="activeTab"
    @change-tab="changeTab"
  />
</template>
