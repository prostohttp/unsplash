<script setup>
import { onMounted, ref, shallowRef, watch } from "vue";
import { useProfileStore } from "@/stores/profile.js";
import AppPhotosGrid from "@/components/AppPhotosGrid.vue";

// Stores
const profileStore = useProfileStore();

// Vars
const isLazyLoading = ref(false);
const error = ref("");
const isEnd = ref("");
const endTrigger = ref(false);
const target = ref(null);
const observer = shallowRef();

// Handlers
const callback = async (entries) => {
	for (const { isIntersecting } of entries) {
		if (isIntersecting) {
			isLazyLoading.value = true;
			let res;
			try {
				if (!isEnd.value) {
					res = await profileStore.apiUsersGetPhotos(
						localStorage.getItem("isAuth"),
						profileStore.pageTabPhotosIndex
					);

					if (!res.response.results.length) {
						isEnd.value = true;
					}

					profileStore.pageTabPhotosIndex =
						profileStore.pageTabPhotosIndex + 1;
					if (res.errors) {
						error.value = "Возникла ошибка";
					} else if (res.response.results.length) {
						profileStore.setPhotos([
							...profileStore.userPhotos,
							...res.response.results,
						]);
					}
				}
			} catch (e) {
				error.value = "Ошибка сети";
			}
			isLazyLoading.value = false;
		}
	}
};
// Hooks
watch(endTrigger, () => {
	if (endTrigger.value) {
		observer.value.disconnect();
	}
});
onMounted(() => {
	observer.value = new IntersectionObserver(callback, {
		threshold: 0,
	});
	observer.value.observe(target.value);
});
</script>

<template>
	<div class="relative">
		<div v-if="error" class="text-[16px]">{{ error }}</div>
		<div v-else class="relative h-full">
			<AppPhotosGrid
				:items="profileStore.userPhotos"
				:route="{
					name: 'profile-photo',
					param: 'photo',
					tab: 'tab-photos',
				}"
			/>
			<div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
			<div v-if="isEnd" class="max-w-[1280px] text-center">
				Фото больше нет
			</div>
		</div>
		<div
			ref="target"
			class="target absolute bottom-0 -z-[1] h-[200px] w-full"
		></div>
	</div>
</template>
