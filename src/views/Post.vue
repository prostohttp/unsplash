<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { UseImage } from "@vueuse/components";
import { authRequest } from "@/api/unsplash.js";
import { numWord } from "@/helpers/functions.js";
import { usePostStore } from "@/stores/post.js";
import likeIcon from "~/svg/notifications-icon.svg";

// Stores
const postStore = usePostStore();
const { routeNameForHash, routeQueryForHash } = storeToRefs(postStore);
// Vars
const route = useRoute();
const api = authRequest();
const photo = ref({});
const error = ref("");
const isLoading = ref(true);
const isFull = ref(false);
// Handlers
const likeHandler = () => {
	alert("Лайк не предусмотрен API");
};
// Hooks
onBeforeMount(async () => {
	const res = await api.photos.get({ photoId: route.params.id || "" });
	if (res.errors) {
		error.value = "Не найдена фотография";
	} else {
		photo.value = res.response;
		isLoading.value = false;
	}
});
</script>

<template>
	<h1 v-if="error">{{ error }}</h1>
	<div v-else-if="isLoading">Загрузка...</div>
	<div
		v-else-if="photo.user"
		class="mb-[12px] flex flex-col gap-[10px] py-[12px] text-[14px]"
	>
		<div class="mb-[8px] flex items-center gap-[10px]">
			<div
				class="flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full border-[2px] border-accent"
			>
				<a
					:href="photo.user.links.html"
					class="border-[2px] border-white"
					target="_blank"
				>
					<img
						:alt="photo.user.name"
						:src="photo.user.profile_image.large"
						class="h-[35px] w-[35px] rounded-full object-cover object-center"
					/>
				</a>
			</div>
			<a
				:href="photo.user.links.html"
				class="font-semibold"
				target="_blank"
			>
				{{ photo.user.name }}
			</a>
			<span class="text-dark-grey">
				{{ new Date(photo.created_at).toLocaleTimeString() }} |
				{{ new Date(photo.created_at).toLocaleDateString() }}
			</span>
		</div>
		<div class="overflow-hidden rounded-[3px]">
			<UseImage
				v-if="isFull"
				:alt="photo.alt_description"
				:src="photo.urls.full"
				class="h-auto w-full cursor-zoom-out rounded-[3px]"
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
				:alt="photo.alt_description"
				:src="photo.urls.small"
				class="w-auto cursor-zoom-in rounded-[3px]"
				@click="isFull = !isFull"
			/>
		</div>
		<div class="border-b border-grey pb-[20px]">
			<div class="mb-[15px] mt-[5px] flex">
				<a
					class="flex items-center justify-center"
					@click.prevent="likeHandler"
				>
					<img :src="likeIcon" alt="like" class="cursor-pointer" />
				</a>
			</div>
			<div class="font-semibold">
				{{ photo.likes }} {{ numWord(photo.likes) }}
			</div>
		</div>
		<router-link
			v-if="routeQueryForHash"
			:to="{
				name: routeNameForHash,
				query: { s: routeQueryForHash },
				hash: `#${photo.id}`,
			}"
		>
			Вернуться к ленте фотографий
		</router-link>
		<router-link
			v-else
			:to="{
				name: routeNameForHash,
				hash: `#${photo.id}`,
			}"
			class="text-blue"
		>
			Вернуться к ленте фотографий
		</router-link>
	</div>
</template>
@/helpers/functions.js
