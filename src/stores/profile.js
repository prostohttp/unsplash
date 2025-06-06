import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.js";

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
	const api = authRequest();

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

	const apiUsersGetPhotos = async (username, page = 1) => {
		return await api.users.getPhotos({
			username,
			page,
		});
	};

	const apiUsersGetCollections = async (username, page = 1, perPage = 10) => {
		return await api.users.getCollections({ username, perPage, page });
	};

	const apiUsersGetLikes = async (username, page = 1) => {
		return await api.users.getLikes({ username, page });
	};

	const apiUsersGet = async (username) => {
		return await api.users.get({ username });
	};

	return {
		userInfo,
		pageTabPhotosIndex,
		pageTabLikesIndex,
		pageTabCollectionsIndex,
		userPhotos,
		userLikes,
		userCollections,
		collectionsItem,
		pageCollectionIndex,
		setUser,
		setPhotos,
		setLikes,
		setCollections,
		resetState,
		setCollectionsItem,
		apiUsersGetPhotos,
		apiUsersGetCollections,
		apiUsersGetLikes,
		apiUsersGet,
	};
});
