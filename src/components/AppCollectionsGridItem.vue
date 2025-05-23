<script setup>
import { useProfileStore } from "@/stores/profile.js";

//Stores
const profileStore = useProfileStore();
//Vars
const { item } = defineProps({
	item: {
		type: Object,
		required: true,
	},
});
// Handlers

// Hooks
</script>

<template>
	<div :id="item.id" class="block">
		<router-link
			:to="{
				name: 'profile-collection-item',
				params: {
					user: item.user.username,
					collection: item.title,
					collectionId: item.id,
				},
			}"
			v-if="item.preview_photos"
			class="grid h-[250px] w-full grid-cols-3 grid-rows-2 gap-[3px] overflow-hidden rounded-[6px]"
		>
			<img
				v-if="item.preview_photos[0]"
				:src="item.preview_photos[0] ? item.preview_photos[0].urls.small : null"
				:alt="item.title"
				class="col-span-2 row-span-2 h-full w-full object-cover object-center"
			/>
			<div v-else class="h-full w-full bg-[#f6f6f6]"></div>
			<img
				v-if="item.preview_photos[1]"
				:src="item.preview_photos[1] ? item.preview_photos[1].urls.small : null"
				:alt="item.title"
				class="col-span-1 row-span-1 h-full w-full object-cover object-center"
			/>
			<div v-else class="h-full w-full bg-[#f6f6f6]"></div>
			<img
				v-if="item.preview_photos[2]"
				:src="item.preview_photos[2] ? item.preview_photos[2].urls.small : null"
				:alt="item.title"
				class="col-span-1 row-span-1 h-full w-full object-cover object-center"
			/>
			<div v-else class="h-full w-full bg-[#f6f6f6]"></div>
		</router-link>
		<router-link
			v-else
			:to="{
				name: 'profile-collection-item',
				params: {
					user: item.user.username,
					collection: item.title,
					collectionId: item.id,
				},
			}"
			class="grid h-[250px] w-full grid-cols-3 grid-rows-2 gap-[3px] overflow-hidden rounded-[6px]"
		>
			<div class="col-span-2 row-span-2 h-full w-full bg-[#f6f6f6]"></div>
			<div class="col-span-1 row-span-1 h-full w-full bg-[#f6f6f6]"></div>
			<div class="col-span-1 row-span-1 h-full w-full bg-[#f6f6f6]"></div>
		</router-link>
		<span class="mt-[15px] block text-[18px] font-semibold text-body">
			{{ item.title }}
		</span>
		<div class="mb-[15px] mt-[5px] flex gap-[10px] text-[14px] text-[#767676]">
			<span>{{ item.total_photos }} фото</span>
			<span
				>Создано
				<a
					:href="item.links.html"
					target="_blank"
					class="cursor-default text-body hover:underline hover:underline-offset-2"
				>
					{{ item.user.name }}
				</a>
			</span>
		</div>
		<div class="flex flex-wrap gap-[9px]" v-if="item.tags">
			<span
				v-for="tag in item.tags"
				class="flex rounded-[2px] bg-[#eee] px-[8px] text-[14px] capitalize text-[#767676]"
			>
				{{ tag.title }}
			</span>
		</div>
	</div>
</template>
