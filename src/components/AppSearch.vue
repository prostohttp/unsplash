<script setup>
import mobileSearch from "~/svg/mobile-search.svg";

// Vars
const model = defineModel();

// Handlers

// Hooks
</script>

<template>
	<input
		v-bind="$attrs"
		v-model="model"
		placeholder="Поиск"
		class="placeholder-dark-grey peer h-[36px] rounded-[8px] bg-[#efefef] py-[3px] pl-[45px] pr-[16px] text-[16px] text-[#000000] outline-none transition-all duration-75 focus:pl-[16px]"
	/>

	<img
		:src="mobileSearch"
		alt="search"
		class="absolute left-[16px] top-[10px] transition-all peer-focus:hidden"
	/>
</template>
