<script setup>
import likeIcon from "~/svg/notifications-icon.svg";
import { numWord } from "@/helpers/functions.js";

// defines
const { item } = defineProps({
	item: {
		type: Object,
		required: true,
	},
});

// Handlers
const likeHandler = () => {
	alert("Лайк не предусмотрен API");
};
</script>

<template>
	<div>
		<div class="mb-[15px] mt-[5px] flex">
			<a
				class="flex items-center justify-center"
				href=""
				@click.prevent="likeHandler"
			>
				<img :src="likeIcon" alt="like" />
			</a>
		</div>
		<div class="font-semibold">
			{{ item.likes }} {{ numWord(item.likes) }}
		</div>
	</div>
</template>
