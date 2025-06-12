<script setup lang="ts">
import { useProfileStore } from "@/stores/profile.ts";
import type { Component } from "vue";
import type { ITabCount } from "@/types.ts";

// Stores
const profileStore = useProfileStore();

// Vars
const emit = defineEmits<{
	"change-tab": [index: number];
}>();
const { titles, activeTab, content } = defineProps<{
	titles: {
		label: string;
		name: string;
		count: ITabCount;
		icon: Component;
	}[];
	activeTab: number;
	content: Component;
}>();
</script>

<template>
	<div class="tabs relative w-full">
		<ul
			class="sticky left-0 top-[60px] z-[100] mb-[40px] flex w-full gap-[30px] border-b border-grey bg-white iphone:top-0"
		>
			<li
				v-for="(title, index) in titles"
				:key="index"
				@click="emit('change-tab', index)"
				:class="[
					'flex',
					'cursor-pointer',
					'items-center',
					'gap-[6px]',
					'border-b-2',
					'border-transparent',
					'py-[12px]',
					'text-[#767676]',
					'group',
					{
						'active border-b-[#000] text-body': activeTab === index,
					},
				]"
			>
				<component
					:is="title.icon"
					class="w-[16px] fill-[#d1d1d1] group-hover:fill-body"
				/>
				<span class="group-hover:text-body">
					{{ title.label }}
				</span>
				<span class="group-hover:text-body">
					{{ profileStore.userInfo![title.count] }}
				</span>
			</li>
		</ul>
		<div>
			<component :is="content" />
		</div>
	</div>
</template>
