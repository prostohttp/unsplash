<script setup>
import AppFeedItemHeader from "@/components/AppFeedItemHeader.vue";
import AppFeedItemBody from "@/components/AppFeedItemBody.vue";
import AppFeedItemFooter from "@/components/AppFeedItemFooter.vue";

// vars
const { item } = defineProps({
	item: {
		type: Object,
		required: true,
	},
});
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
