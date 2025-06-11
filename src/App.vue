<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import Main from "@/layouts/Main.vue";
import logo from "~/svg/logo-big.svg";
import FullWidth from "@/layouts/FullWidth.vue";

// vars
const layouts = [Main, FullWidth];
const layoutRef = shallowRef(Main);
const route = useRoute();
const loading = ref(true);
// Handlers
const layout = computed(() => {
	layouts.forEach((layout) => {
		if (layout.__name === route.meta.layout) layoutRef.value = layout;
	});
	return layoutRef.value;
});
// Hooks
onMounted(() => {
	setTimeout(() => {
		loading.value = false;
	}, 1000);
});
</script>

<template>
	<div class="flex h-lvh w-screen items-center justify-center" v-if="loading">
		<img :src="logo" alt="Россграм" class="h-[60px]" />
	</div>
	<component :is="layout" v-else>
		<router-view />
	</component>
</template>
