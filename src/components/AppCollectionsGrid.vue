<script setup lang="ts">
import AppCollectionsGridItem from "@/components/AppCollectionsGridItem.vue";
import { useProfileStore } from "@/stores/profile.ts";

//Stores
const profileStore = useProfileStore();
</script>

<template>
	<div
		class="grid max-w-[1280px] grid-cols-1 gap-[20px] iphone:grid-cols-2 mac:grid-cols-3"
	>
		<AppCollectionsGridItem
			class="mb-[35px] max-w-[410px]"
			v-for="item in profileStore.userCollections"
			:item="item"
		/>
	</div>
</template>
