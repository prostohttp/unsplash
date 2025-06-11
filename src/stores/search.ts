import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.ts";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

export const useSearchStore = defineStore("search", () => {
	const search = ref("");
	const api = authRequest();
	const localSearchList = ref<Basic[]>([]);

	const setSearch = (query: string) => {
		search.value = query;
	};

	const setLocalSearchList = (list: Basic[]) => {
		localSearchList.value = list;
	};

	const apiSearchGetPhotos = async (
		query: string = "",
		page: number = 1
	): Promise<ApiResponse<Photos>> => {
		return await api.search.getPhotos({ query, page });
	};

	return {
		search,
		localSearchList,
		setSearch,
		setLocalSearchList,
		apiSearchGetPhotos,
	};
});
