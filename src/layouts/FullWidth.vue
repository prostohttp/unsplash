<script setup>
import TheSidebar from "@/components/TheSidebar.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
	<main class="relative flex w-full justify-center">
		<aside class="fixed bottom-0 left-0 z-10 h-[50px] w-full iphone:w-auto">
			<TheHeader />
			<TheSidebar />
		</aside>
		<section
			class="relative mt-[30px] px-[16px] py-[70px] iphone:ml-[100px] iphone:mt-0 iphone:w-[95%] iphone:pt-[30px] mac:ml-[300px] imac:ml-[400px]"
		>
			<slot />
		</section>
	</main>
</template>
