<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from "vue";
import { useRoute } from "vue-router";
import AppFeed from "@/components/AppFeed.vue";
import { usePostStore } from "@/stores/post.ts";
import UserInfoBlock from "@/components/AppUserInfoBlock.vue";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

// Stores
const postStore = usePostStore();

// Vars
const posts = ref<Basic[]>([]);
const error = ref("");
const route = useRoute();
const isEnd = ref(false);
const endTrigger = ref(false);
const target = ref(null);
const observer = shallowRef();
const isLazyLoading = ref(false);
const firstFeed = ref(true);

// Handlers
const callback = async (entries: IntersectionObserverEntry[]) => {
	for (const { isIntersecting } of entries) {
		if (isIntersecting) {
			let res;
			try {
				isLazyLoading.value = true;

				const rawData = await postStore.apiPhotosList(
					postStore.pageIndex
				);

				if (firstFeed.value) {
					res = rawData.response?.results;
					firstFeed.value = false;
				} else {
					res = rawData.response?.results.slice(1);
					if (res && !res.length) {
						isEnd.value = true;
					}
				}
				postStore.pageIndex++;

				if (rawData.errors) {
					error.value = "Ошибка при загрузке ленты фотографий";
				} else if (res && res.length) {
					posts.value = [...posts.value, ...res];
					postStore.setPosts(posts.value);
				}
				isLazyLoading.value = false;
			} catch (e) {
				console.log(e);
			}
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
	<div class="flex iphone:gap-[50px]">
		<div class="relative h-full min-w-[400px]">
			<h2 v-if="error" class="text-center text-[22px]">{{ error }}</h2>
			<AppFeed
				v-else
				:feeds="postStore.posts"
				:route-name="route.name as string"
			/>
			<div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
			<div v-if="isEnd" class="max-w-[1280px] text-center">Фото нет</div>
		</div>
		<div
			ref="target"
			class="target absolute bottom-0 -z-[1] h-[500px] w-full"
		></div>
		<div class="relative mt-[12px] hidden flex-col iphone:flex">
			<UserInfoBlock />
		</div>
	</div>
</template>
