<script setup>
// import mock from "@/api/mock.json";
import AppFeedItem from "@/components/AppFeedItem.vue";
import { usePostStore } from "@/stores/post.js";
import { onMounted } from "vue";

// Stores
const postStore = usePostStore();
const { setRouteNameForHash } = postStore;
// Vars
const { feeds, routeName } = defineProps({
	feeds: {
		type: Array,
		required: true,
	},
	routeName: {
		type: String,
		required: false,
		default: "home",
	},
	routeQuery: {
		required: false,
	},
});
onMounted(() => {
	setRouteNameForHash(routeName);
});
</script>

<template>
	<div>
		<AppFeedItem v-for="item in feeds" :key="item.id" :item="item" />
	</div>
</template>
