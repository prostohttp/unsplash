import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
	// Vars
	const userInfo = ref(null);
	const userPhotos = ref([]);
	const userLikes = ref([]);
	const userCollections = ref([]);
	const pageTabPhotosIndex = ref(1);
	const pageTabLikesIndex = ref(1);
	const pageTabCollectionsIndex = ref(1);
	const pageCollectionIndex = ref(1);
	const collectionsItem = ref([]);
	// Handlers
	const setUser = (data) => {
		userInfo.value = data;
	};
	const setPhotos = (data) => {
		userPhotos.value = data;
	};
	const setLikes = (data) => {
		userLikes.value = data;
	};
	const setCollections = (data) => {
		userCollections.value = data;
	};
	const setCollectionsItem = (data) => {
		collectionsItem.value = data;
	};
	const resetState = () => {
		userInfo.value = null;
		userPhotos.value = [];
		userLikes.value = [];
		userCollections.value = [];
		pageTabPhotosIndex.value = 1;
		pageTabLikesIndex.value = 1;
		pageTabCollectionsIndex.value = 1;
	};
	return {
		userInfo,
		setUser,
		pageTabPhotosIndex,
		pageTabLikesIndex,
		pageTabCollectionsIndex,
		userPhotos,
		userLikes,
		userCollections,
		setPhotos,
		setLikes,
		setCollections,
		resetState,
		collectionsItem,
		setCollectionsItem,
		pageCollectionIndex,
	};
});
