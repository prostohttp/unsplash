<script setup>
// defines
const { item } = defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="overflow-hidden rounded-[3px]">
		<router-link :to="{ name: 'post', params: { id: item.id } }">
			<img
				:alt="item.alt_description"
				:src="item.urls.small"
				class="w-auto"
			/>
		</router-link>
	</div>
</template>
