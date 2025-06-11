<script lang="ts" setup>
import AppFeedItem from "@/components/AppFeedItem.vue";
import { usePostStore } from "@/stores/post.ts";
import { onMounted } from "vue";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

// Stores
const postStore = usePostStore();
const { setRouteNameForHash } = postStore;

// Vars
const { feeds, routeName } = defineProps<{
	feeds: Basic[];
	routeName?: string | null;
	routeQuery?: string;
}>();

// Hooks
onMounted(() => {
	if (routeName) {
		setRouteNameForHash(routeName);
	}
});
</script>

<template>
	<div>
		<AppFeedItem v-for="item in feeds" :key="item.id" :item="item" />
	</div>
</template>
