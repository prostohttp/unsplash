import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.ts";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Basic, Full } from "unsplash-js/dist/methods/photos/types";

export const usePostStore = defineStore("post", () => {
	// Vars
	const posts = ref<Basic[]>([]);
	const routeNameForHash = ref("home");
	const routeQueryForHash = ref<null | string>(null);
	const pageIndex = ref(1);
	const pageSearchIndex = ref(1);
	const api = authRequest();

	// Handlers
	const setPosts = (feed: Basic[]) => {
		posts.value = feed;
	};

	const setRouteNameForHash = (name: string): void => {
		routeNameForHash.value = name;
	};

	const setRouteQueryForHash = (query: string): void => {
		routeQueryForHash.value = query;
	};

	const apiPhotosList = async (
		page: number
	): Promise<
		ApiResponse<{
			results: Basic[];
			total: number;
		}>
	> => {
		return await api.photos.list({ page });
	};

	const apiPhotosGet = async (id = ""): Promise<ApiResponse<Full>> => {
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
