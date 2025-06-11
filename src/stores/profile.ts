import { defineStore } from "pinia";
import { ref } from "vue";
import { authRequest } from "@/api/index.ts";
import type { Full } from "unsplash-js/dist/methods/users/types";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import type { Basic as CollectionBasic } from "unsplash-js/dist/methods/collections/types";

export const useProfileStore = defineStore("profile", () => {
	// Vars
	const userInfo = ref<Full | null>();
	const userPhotos = ref<Basic[]>([]);
	const userLikes = ref<Basic[]>([]);
	const userCollections = ref<CollectionBasic[]>([]);
	const pageTabPhotosIndex = ref(1);
	const pageTabLikesIndex = ref(1);
	const pageTabCollectionsIndex = ref(1);
	const pageCollectionIndex = ref(1);
	const collectionsItem = ref<Basic[]>();
	const api = authRequest();

	// Handlers
	const setUser = (data: Full) => {
		userInfo.value = data;
	};

	const setPhotos = (data: Basic[]) => {
		userPhotos.value = data;
	};

	const setLikes = (data: Basic[]) => {
		userLikes.value = data;
	};

	const setCollections = (data: CollectionBasic[]) => {
		userCollections.value = data;
	};

	const setCollectionsItem = (data: Basic[]) => {
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

	const apiUsersGetPhotos = async (
		username: string,
		page = 1
	): Promise<
		ApiResponse<{
			results: Basic[];
			total: number;
		}>
	> => {
		return await api.users.getPhotos({
			username,
			page,
		});
	};

	const apiUsersGetCollections = async (
		username: string,
		page = 1,
		perPage = 10
	): Promise<
		ApiResponse<{
			results: CollectionBasic[];
			total: number;
		}>
	> => {
		return await api.users.getCollections({ username, perPage, page });
	};

	const apiUsersGetLikes = async (
		username: string,
		page = 1
	): Promise<
		ApiResponse<{
			results: Basic[];
			total: number;
		}>
	> => {
		return await api.users.getLikes({ username, page });
	};

	const apiUsersGet = async (
		username: string
	): Promise<ApiResponse<Full>> => {
		return await api.users.get({ username });
	};

	const apiCollectionsGetPhotos = async (
		collectionId: string,
		page: number = 1,
		perPage: number = 10
	): Promise<
		ApiResponse<{
			results: any[];
			total: number;
		}>
	> => {
		return await api.collections.getPhotos({
			collectionId,
			page,
			perPage,
		});
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
		apiCollectionsGetPhotos,
	};
});
