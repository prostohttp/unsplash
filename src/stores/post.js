import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.js";

export const usePostStore = defineStore("post", () => {
	// Vars
	const posts = ref([]);
	const routeNameForHash = ref("home");
	const routeQueryForHash = ref(null);
	const pageIndex = ref(1);
	const pageSearchIndex = ref(1);
	const api = authRequest();

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

	const apiPhotosList = async (page) => {
		return await api.photos.list({ page });
	};

	const apiPhotosGet = async (id = "") => {
		return await api.photos.get({ photoId: id });
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
		apiPhotosList,
		apiPhotosGet,
	};
});
