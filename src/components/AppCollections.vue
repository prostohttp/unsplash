<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { vIntersectionObserver } from "@vueuse/components";
import { useProfileStore } from "@/stores/profile.ts";
import AppCollectionsGrid from "@/components/AppCollectionsGrid.vue";

// Stores
const profileStore = useProfileStore();

// Vars
const root = useTemplateRef<HTMLDivElement>("root");
const isLazyLoading = ref(false);
const error = ref("");
const isEnd = ref(false);

// Handlers
const onIntersectionObserver = async ([entry]: IntersectionObserverEntry[]) => {
	if (entry) {
		try {
			if (isEnd.value) {
				return;
			}

			isLazyLoading.value = true;

			const res = await profileStore.apiUsersGetCollections(
				localStorage.getItem("isAuth")!,
				profileStore.pageTabCollectionsIndex,
				10
			);

			if (!res.response?.results.length) {
				isEnd.value = true;
				return;
			}

			profileStore.pageTabCollectionsIndex++;

			if (res.errors) {
				error.value = "Возникла ошибка";
			} else if (res.response.results.length) {
				profileStore.setCollections([
					...profileStore.userCollections,
					...res.response.results,
				]);
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
		<div v-if="isEnd" class="text-[16px]">
			{{ "Больше нет коллекций" }}
		</div>
		<div v-else-if="isLazyLoading" class="text-[14px]">
			Загрузка фото...
		</div>
		<div
			v-intersection-observer="[onIntersectionObserver, { root }]"
			class="observer bottom-[300px] left-0 h-[1px] w-full"
		></div>
	</div>
</template>
