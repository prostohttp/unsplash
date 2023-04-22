<script setup>
import { useField } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import AppFeed from "@/components/AppFeed.vue";
import { authRequest } from "@/api/unsplash.js";
import { useRoute, useRouter } from "vue-router";
import AppSearch from "@/components/AppSearch.vue";
import { usePostStore } from "@/stores/post.js";
import { useSearchStore } from "@/stores/search.js";
import { storeToRefs } from "pinia";

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
    isLoading.value = true;
    setLocalSearchList([]);
    try {
      const res = await api.search.getPhotos({
        query: route.query.s,
      });
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
// Hooks
onMounted(async () => {
  searchValue.value = route.query.s;
  if (!localSearchList.value.length) {
    await searchHandler();
  }
  if (route.query.s) {
    setRouteQueryForHash(route.query.s);
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
  <div class="max-w-[700px]">
    <form @submit.prevent="onSubmit" class="fixed top-[20px]">
      <AppSearch v-model="searchValue" />
    </form>
    <div v-if="isLoading" class="mt-[50px] text-center text-[22px]">
      Загрузка...
    </div>
    <AppFeed
      v-else-if="localSearchList.length"
      :feeds="localSearchList"
      :route-name="route.name"
      :route-query="route.query.s || null"
      class="mt-[50px]"
    />
    <div
      v-else-if="error && !isLoading"
      class="mt-[50px] text-center text-[22px]"
    >
      {{ error }}
    </div>
  </div>
</template>
