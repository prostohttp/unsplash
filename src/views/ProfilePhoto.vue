<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { UseImage } from "@vueuse/components";
import likeIcon from "~/svg/notifications-icon.svg";
import { useProfileStore } from "@/stores/profile.js";
import type { Basic } from "unsplash-js/dist/methods/photos/types";
import { numWord } from "@/helpers/functions.ts";

// Stores
const profileStore = useProfileStore();
// Vars
const route = useRoute();
const router = useRouter();
const photo = ref<Basic>();
const error = ref("");
const isLoading = ref(true);
const isFull = ref(false);

// Handlers
const likeHandler = () => {
	alert("Лайк не предусмотрен API");
};
// Hooks
onMounted(async () => {
	if (profileStore.userPhotos.length) {
		const userPhoto = profileStore.userPhotos.find(
			(photo) => photo.id === route.params.photo
		);
		if (userPhoto) {
			photo.value = userPhoto;
		}
		isLoading.value = false;
	} else {
		isLoading.value = false;
		error.value = "Не найдена фотография";
	}
});
</script>

<template>
	<h1 v-if="error" class="text-[18px]">{{ error }}</h1>
	<div v-else-if="isLoading">Загрузка...</div>
	<div
		v-else-if="photo"
		class="mb-[12px] flex flex-col gap-[10px] py-[12px] text-[14px]"
	>
		<div class="overflow-hidden rounded-[3px]">
			<UseImage
				v-if="isFull"
				:src="photo.urls.full"
				:alt="photo.alt_description!"
				class="w-auto cursor-zoom-out rounded-[3px]"
				@click="isFull = !isFull"
			>
				<template #loading>
					<div class="flex items-center justify-center text-[22px]">
						Загрузка фото...
					</div>
				</template>
				<template #error> Ошибка загрузки фото</template>
			</UseImage>
			<img
				v-else
				:src="photo.urls.small"
				:alt="photo.alt_description!"
				class="w-auto cursor-zoom-in rounded-[3px]"
				@click="isFull = !isFull"
			/>
		</div>
		<div class="border-b border-grey pb-[20px]">
			<div class="mb-[15px] mt-[5px] flex">
				<a
					@click.prevent="likeHandler"
					class="flex items-center justify-center"
				>
					<img :src="likeIcon" alt="like" class="cursor-pointer" />
				</a>
			</div>
			<div class="font-semibold">
				{{ photo.likes }} {{ numWord(photo.likes) }}
			</div>
		</div>
		<a @click.prevent="router.back()" class="cursor-pointer text-blue">
			Вернуться назад
		</a>
	</div>
</template>
