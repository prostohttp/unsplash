<script setup lang="ts">
import { getDateDiff } from "@/helpers/functions.ts";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

// defines
const { item } = defineProps<{
	item: Basic;
}>();
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
			{{
				getDateDiff(
					new Date().toString(),
					new Date(item.created_at).toString()
				)
			}}
		</span>
	</div>
</template>
