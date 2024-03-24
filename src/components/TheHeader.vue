<script setup>
import fullLogo from "~/svg/logo-big.svg";
import notifIcon from "~/svg/notifications-icon.svg";
import { useField } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import AppSearch from "@/components/AppSearch.vue";

// Vars
const router = useRouter();
const route = useRoute();
const { value: searchValue } = useField("search");
// Handlers
const onSubmit = () => {
	router.push({
		name: "search",
		query: {
			s: searchValue.value,
		},
	});
};
watch(route, (value) => {
	searchValue.value = value.query.s;
});
</script>

<template>
	<div
		class="fixed left-0 top-0 flex h-[60px] w-full items-center justify-between gap-[5px] border-b border-grey bg-white px-[16px] iphone:hidden"
	>
		<router-link :to="{ name: 'home' }">
			<img :src="fullLogo" alt="Россграм" class="h-[30px]" />
		</router-link>
		<form @submit.prevent="onSubmit" class="relative">
			<AppSearch v-model="searchValue" class="w-[230px] iphone:w-[268px]" />
		</form>
		<img :src="notifIcon" alt="notifications" />
	</div>
</template>
