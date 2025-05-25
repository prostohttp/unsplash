import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore("post", () => {
	// Vars
	const posts = ref([]);
	const routeNameForHash = ref("home");
	const routeQueryForHash = ref(null);
	const pageIndex = ref(1);
	const pageSearchIndex = ref(1);
	// Handlers
	const setPosts = (feed) => {
		posts.value = feed;
	};
	const setRouteNameForHash = (name) => {
		routeNameForHash.value = name;
	};
	const setRouteQueryForHash = (query) => {
		routeQueryForHash.value = query;
	};
	return {
		posts,
		routeNameForHash,
		routeQueryForHash,
		pageIndex,
		pageSearchIndex,
		setRouteNameForHash,
		setRouteQueryForHash,
		setPosts,
	};
});
