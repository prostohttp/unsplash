<script setup lang="ts">
import type { Basic } from "unsplash-js/dist/methods/photos/types";

//Vars
const { item, route } = defineProps<{
	item: Basic;
	route: {
		name: string;
		param: string;
		tab?: string;
	};
}>();
</script>

<template>
	<router-link
		:to="{
			name: route.name,
			params: {
				user: item.user.username,
				tab: route.tab,
				[route.param]: item.id,
			},
		}"
		:id="item.id"
		class="masonry-image iphone:w-auto w-full"
	>
		<img
			:src="item.urls.small"
			:alt="item.alt_description!"
			class="w-full rounded-[3px]"
		/>
	</router-link>
</template>
