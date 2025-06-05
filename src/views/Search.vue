<script setup>
import { useField } from "vee-validate";
import { onMounted, ref, shallowRef, watch } from "vue";
import { storeToRefs } from "pinia";
import AppFeed from "@/components/AppFeed.vue";
import { authRequest } from "@/api/unsplash.js";
import { useRoute, useRouter } from "vue-router";
import AppSearch from "@/components/AppSearch.vue";
import { usePostStore } from "@/stores/post.js";
import { useSearchStore } from "@/stores/search.js";
import UserInfoBlock from "@/components/AppUserInfoBlock.vue";

// Stores
const postStore = usePostStore();
const { setRouteQueryForHash } = postStore;
const searchStore = useSearchStore();
const { localSearchList } = storeToRefs(searchStore);
const { setLocalSearchList } = searchStore;
// Vars
const route = useRoute();
const router = useRouter();
const { value: searchValue } = useField("search");
const error = ref("");
const api = authRequest();
const isLazyLoading = ref(false);
const isEnd = ref(false);
const endTrigger = ref(false);
const target = ref(null);
const observer = shallowRef();

// Handlers
const initialSearchData = async () => {
	isEnd.value = false;
	if (route.query.s) {
		try {
			const res = await api.search.getPhotos({
				query: route.query.s,
				page: postStore.pageSearchIndex,
			});

			if (res.errors) {
				error.value = "Возникла ошибка";
			} else if (res.response.results.length) {
				setLocalSearchList([
					...localSearchList.value,
					...res.response.results,
				]);
			}
		} catch (e) {
			error.value = "Ошибка сети";
		}
	}
};

const callback = async (entries) => {
	for (const { isIntersecting } of entries) {
		if (isIntersecting) {
			if (route.query.s) {
				let res;
				try {
					if (!isEnd.value) {
						isLazyLoading.value = true;

						res = await api.search.getPhotos({
							query: route.query.s,
							page: postStore.pageSearchIndex,
						});

						if (!res.response.results.length) {
							isEnd.value = true;
						}

						postStore.pageSearchIndex =
							postStore.pageSearchIndex + 1;

						if (res.errors) {
							error.value = "Возникла ошибка";
						} else if (res.response.results.length) {
							setLocalSearchList([
								...localSearchList.value,
								...res.response.results,
							]);
						}
						isLazyLoading.value = false;
					}
				} catch (e) {
					error.value = "Ошибка сети";
					console.log(e);
				}
			}
		}
	}
};
const searchHandler = async () => {
	if (route.query.s) {
		isEnd.value = false;
		try {
			const res = await api.search.getPhotos({
				query: route.query.s,
				page: 1,
			});
			setLocalSearchList([]);
			if (res.errors) {
				error.value = "Возникла ошибка";
			} else if (res.response.results.length) {
				setLocalSearchList(res.response.results);
			} else {
				error.value = "Ничего не найдено";
			}
		} catch (e) {
			error.value = "Ошибка сети";
			console.log(e);
		}
	}
};
const onSubmit = () => {
	router.push({
		name: "search",
		query: {
			s: searchValue.value,
		},
	});
};

// Hooks
onMounted(async () => {
	searchValue.value = route.query.s;
	await initialSearchData();
	observer.value = new IntersectionObserver(callback, {
		threshold: 0,
	});
	observer.value.observe(target.value);
	if (route.query.s) {
		setRouteQueryForHash(route.query.s);
	} else {
		setLocalSearchList([]);
	}
});

watch(
	() => route.query.s,
	async () => {
		const searchQuery = route.query.s;
		searchValue.value = searchQuery;

		await searchHandler();
		if (searchQuery) {
			setRouteQueryForHash(searchQuery);
		}
	}
);

watch(endTrigger, () => {
	if (endTrigger.value) {
		observer.value.disconnect();
	}
});
</script>

<template>
	<div class="flex iphone:gap-[50px]">
		<div
			class="relative h-full pt-[12px] iphone:min-w-[350px] ipad:min-w-[400px]"
		>
			<form
				class="relative hidden iphone:flex"
				@submit.prevent="onSubmit"
			>
				<AppSearch v-model="searchValue" class="w-full" />
			</form>

			<AppFeed
				v-if="localSearchList.length"
				:feeds="localSearchList"
				:route-name="route.name"
				:route-query="route.query.s || null"
				class="iphone:mt-[50px]"
			/>
			<div v-else class="mt-[50px] text-center text-[22px]">
				{{ error }}
			</div>
			<div v-if="isLazyLoading" class="text-[14px]">Загрузка фото...</div>
			<div v-if="isEnd" class="max-w-[1280px] text-center">Фото нет</div>
			<div
				ref="target"
				class="target absolute bottom-0 -z-[1] h-[500px] w-full"
			></div>
		</div>
		<div class="relative mt-[12px] hidden flex-col iphone:flex">
			<UserInfoBlock />
		</div>
	</div>
</template>
