<script setup>
import { getDateDiff } from "@/helpers/functions.js";

// defines
const { item } = defineProps({
	item: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="mb-[8px] flex items-center gap-[10px]">
		<div
			class="flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full border-[2px] border-accent"
		>
			<a
				:href="item.user.links.html"
				class="border-[2px] border-white app-feed-link-image"
				target="_blank"
			>
				<img
					:alt="item.user.name"
					:src="item.user.profile_image.large"
					class="h-[35px] w-[35px] rounded-full object-cover object-center app-feed-link-image"
				/>
			</a>
		</div>
		<a
			:href="item.user.links.html"
			class="font-semibold app-feed-link-username"
			target="_blank"
		>
			{{ item.user.username }}
		</a>
		<span class="text-dark-grey">
			{{ getDateDiff(new Date(), new Date(item.created_at)) }}
		</span>
	</div>
</template>
