import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]);
  const routeNameForHash = ref("home");
  const routeQueryForHash = ref(null);
  const setPosts = (feed) => {
    posts.value = feed;
  };
  const pageIndex = ref(1);
  const setRouteNameForHash = (name) => {
    routeNameForHash.value = name;
  };
  const setRouteQueryForHash = (query) => {
    routeQueryForHash.value = query;
  };
  return {
    posts,
    setPosts,
    routeNameForHash,
    routeQueryForHash,
    setRouteNameForHash,
    setRouteQueryForHash,
    pageIndex,
  };
});
