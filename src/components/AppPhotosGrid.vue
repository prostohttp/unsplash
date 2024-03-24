<script setup>
import AppPhotosGridItem from "@/components/AppPhotosGridItem.vue";

//Stores
// Vars
const { items, route } = defineProps({
	items: {
		type: Array,
		required: true,
	},
	route: {
		type: Object,
		required: true,
	},
});

// Handlers
// Hooks
</script>

<template>
	<div
		v-masonry
		transition-duration="0.3s"
		item-selector=".item"
		class="max-w-[1280px]"
		gutter="25"
	>
		<AppPhotosGridItem
			:route="route"
			v-masonry-tile
			class="item mb-[20px]"
			v-for="item in items"
			:item="item"
		/>
	</div>
</template>
