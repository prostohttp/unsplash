<script setup>
import { useField } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { storeToRefs } from "pinia";
import AppFeed from "@/components/AppFeed.vue";
import { authRequest } from "@/api/unsplash.js";
import { useRoute, useRouter } from "vue-router";
import AppSearch from "@/components/AppSearch.vue";
import { usePostStore } from "@/stores/post.js";
import { useSearchStore } from "@/stores/search.js";
import UserInfoBlock from "@/components/AppUserInfoBlock.vue";

// Stores
const postStore = usePostStore();
const { setRouteQueryForHash } = postStore;
const searchStore = useSearchStore();
const { localSearchList } = storeToRefs(searchStore);
const { setLocalSearchList } = searchStore;
// Vars
const route = useRoute();
const root = ref(null);
const router = useRouter();
const { value: searchValue } = useField("search");
const error = ref("");
const api = authRequest();

// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
  if (isIntersecting) {
    if (route.query.s) {
      try {
        postStore.pageSearchIndex = postStore.pageSearchIndex + 1;
        const res = await api.search.getPhotos({
          query: route.query.s,
          page: postStore.pageSearchIndex,
        });
        if (res.errors) {
          error.value = "Возникла ошибка";
        } else if (res.response.results.length) {
          setLocalSearchList([
            ...localSearchList.value,
            ...res.response.results,
          ]);
        } else {
          error.value = "Ничего не найдено";
        }
      } catch (e) {
        error.value = "Ошибка сети";
        console.log(e);
      }
    }
  }
};

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
      setLocalSearchList([]);
      if (res.errors) {
        error.value = "Возникла ошибка";
      } else if (res.response.results.length) {
        setLocalSearchList(res.response.results);
      } else {
        error.value = "Ничего не найдено";
      }
    } catch (e) {
      error.value = "Ошибка сети";
      console.log(e);
    }
  }
};

// Hooks
onMounted(async () => {
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
    <div
      class="relative h-full pt-[12px] iphone:min-w-[350px] ipad:min-w-[400px]"
      ref="root"
    >
      <form @submit.prevent="onSubmit" class="relative hidden iphone:flex">
        <AppSearch v-model="searchValue" class="w-full" />
      </form>

      <AppFeed
        v-if="localSearchList.length"
        :feeds="localSearchList"
        :route-name="route.name"
        :route-query="route.query.s || null"
        class="iphone:mt-[50px]"
      />

      <div v-else class="mt-[50px] text-center text-[22px]">
        {{ error }}
      </div>
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
