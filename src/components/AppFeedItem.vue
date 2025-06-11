<script setup lang="ts">
import AppFeedItemHeader from "@/components/AppFeedItemHeader.vue";
import AppFeedItemBody from "@/components/AppFeedItemBody.vue";
import AppFeedItemFooter from "@/components/AppFeedItemFooter.vue";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

// vars
const { item } = defineProps<{
	item: Basic;
}>();
</script>

<template>
	<div
		:id="item.id"
		class="mb-[12px] flex flex-col gap-[10px] border-b border-grey py-[12px] text-[14px]"
	>
		<AppFeedItemHeader :item="item" />
		<AppFeedItemBody :item="item" />
		<AppFeedItemFooter :item="item" />
	</div>
</template>
