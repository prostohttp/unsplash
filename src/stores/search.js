import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.js";

export const useSearchStore = defineStore("search", () => {
	const search = ref("");
	const api = authRequest();
	const localSearchList = ref([]);

	const setSearch = (query) => {
		search.value = query;
	};

	const setLocalSearchList = (list) => {
		localSearchList.value = list;
	};

	const apiSearchGetPhotos = async (query = "", page = 1) => {
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
