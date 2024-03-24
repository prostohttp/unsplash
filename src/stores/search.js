import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
	const search = ref("");
	const localSearchList = ref([]);
	const setSearch = (query) => {
		search.value = query;
	};
	const setLocalSearchList = (list) => {
		localSearchList.value = list;
	};
	return { search, setSearch, localSearchList, setLocalSearchList };
});
