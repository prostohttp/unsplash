<script setup>
import { ref } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import AppCollectionsGrid from "@/components/AppCollectionsGrid.vue";

// Stores
const profileStore = useProfileStore();
// Vars
const api = authRequest();
const root = ref(null);
const isLazyLoading = ref(false);
const error = ref("");
// Handlers
const onIntersectionObserver = async ([{ isIntersecting }]) => {
	if (isIntersecting) {
		try {
			isLazyLoading.value = true;
			const res = await api.users.getCollections({
				username: localStorage.getItem("isAuth"),
				page: profileStore.pageTabCollectionsIndex,
				perPage: 10,
			});
			profileStore.pageTabCollectionsIndex =
				profileStore.pageTabCollectionsIndex + 1;
			if (res.errors) {
				error.value = "Возникла ошибка";
			} else if (res.response.results.length) {
				profileStore.setCollections([
					...profileStore.userCollections,
					...res.response.results,
				]);
			} else if (!profileStore.userCollections.length) {
				error.value = " Нет коллекций";
			}
		} catch (e) {
			error.value = "Ошибка сети";
			console.log(e);
		}
		isLazyLoading.value = false;
	}
};
</script>

<template>
	<div v-if="error" class="text-[16px]">{{ error }}</div>
	<div v-else ref="root" class="relative h-full">
		<AppCollectionsGrid />
		<div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
		<div
			v-intersection-observer="[onIntersectionObserver, { root }]"
			class="observer bottom-[300px] left-0 h-[1px] w-full"
		></div>
	</div>
</template>
