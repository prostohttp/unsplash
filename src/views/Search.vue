<script setup>
import { useField } from "vee-validate";
import { onMounted, onUnmounted, ref, watch } from "vue";
import AppFeed from "@/components/AppFeed.vue";
import { authRequest } from "@/api/unsplash.js";
import { useRoute, useRouter } from "vue-router";
import AppSearch from "@/components/AppSearch.vue";
import { usePostStore } from "@/stores/post.js";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";
import UserInfoBlock from "@/components/AppUserInfoBlock.vue";

// Stores
const postStore = usePostStore();
const { setRouteQueryForHash } = postStore;
const searchStore = useSearchStore();
const { localSearchList } = storeToRefs(searchStore);
const { setLocalSearchList } = searchStore;
// Vars
const route = useRoute();
const router = useRouter();
const { value: searchValue } = useField("search");
const error = ref("");
const isLoading = ref(false);
const api = authRequest();

// Handlers
const onSubmit = () => {
  router.push({
    name: "search",
    query: {
      s: searchValue.value,
    },
  });
};
const searchHandler = async () => {
  if (route.query.s) {
    try {
      const res = await api.search.getPhotos({
        query: route.query.s,
        page: postStore.pageSearchIndex,
      });
      isLoading.value = true;
      setLocalSearchList([]);
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        setLocalSearchList(res.response.results);
      } else {
        error.value = "Ничего не найдено";
      }
      isLoading.value = false;
    } catch (e) {
      isLoading.value = false;
      error.value = "Ошибка сети";
      console.log(e);
    }
  }
};
const scrollHandler = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  if (currentScroll === documentHeight) {
    if (route.query.s) {
      try {
        postStore.pageSearchIndex = postStore.pageSearchIndex + 1;
        const res = await api.search.getPhotos({
          query: route.query.s,
          page: postStore.pageSearchIndex,
        });
        isLoading.value = true;
        if (res.errors) {
          error.value = "Возникла ошибка";
        } else if (res.response.results.length) {
          setLocalSearchList([
            ...localSearchList.value,
            ...res.response.results,
          ]);
        } else {
          document.removeEventListener("scroll", scrollHandler);
          error.value = "Ничего не найдено";
        }
        isLoading.value = false;
      } catch (e) {
        isLoading.value = false;
        error.value = "Ошибка сети";
        console.log(e);
      }
    }
  }
};
// Hooks
onMounted(async () => {
  document.addEventListener("scroll", scrollHandler);
  searchValue.value = route.query.s;
  if (!localSearchList.value.length) {
    await searchHandler();
  }
  if (route.query.s) {
    setRouteQueryForHash(route.query.s);
  } else {
    setLocalSearchList([]);
  }
});
onUnmounted(async () => {
  document.removeEventListener("scroll", scrollHandler);
});
watch(route, async () => {
  searchValue.value = route.query.s;
  await searchHandler();
  if (route.query.s) {
    setRouteQueryForHash(route.query.s);
  }
});
</script>

<template>
  <div class="flex iphone:gap-[50px]">
    <div class="pt-[12px] iphone:min-w-[350px] ipad:min-w-[400px]">
      <form @submit.prevent="onSubmit" class="relative hidden iphone:flex">
        <AppSearch v-model="searchValue" class="w-full" />
      </form>
      <div v-if="isLoading" class="mt-[50px] text-center text-[22px]">
        Загрузка...
      </div>
      <AppFeed
        v-else-if="localSearchList.length"
        :feeds="localSearchList"
        :route-name="route.name"
        :route-query="route.query.s || null"
        class="iphone:mt-[50px]"
      />
      <div
        v-else-if="error && !isLoading"
        class="mt-[50px] text-center text-[22px]"
      >
        {{ error }}
      </div>
    </div>
    <div class="relative mt-[12px] hidden flex-col iphone:flex">
      <UserInfoBlock />
    </div>
  </div>
</template>
