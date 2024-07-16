<script setup>
// import mock from "@/api/mock.json";
import AppFeedItemVirtualScroller from "@/components/AppFeedItemVirtualScroller.vue";
import { usePostStore } from "@/stores/post.js";
import { onMounted } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

// Stores
const postStore = usePostStore();
const { setRouteNameForHash } = postStore;
// Vars
const { feeds, routeName } = defineProps({
	feeds: {
		type: Array,
		required: true,
	},
	routeName: {
		type: String,
		required: false,
		default: "home",
	},
	routeQuery: {
		required: false,
	},
});
onMounted(() => {
	setRouteNameForHash(routeName);
});
</script>

<template>
	<div>
		<!-- <AppFeedItemVirtualScroller v-for="item in feeds" :key="item.id" :item="item" /> -->
		<DynamicScroller :items="feeds" :min-item-size="54" class="scroller">
			<template v-slot="{ item, index, active }">
				<DynamicScrollerItem
					:item="item"
					:active="active"
					:data-index="index"
				>
					<AppFeedItemVirtualScroller
						:key="item.id"
						:item="item"
					/>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</div>
</template>

<style scoped>
.scroller {
	height: 100%;
}
</style>
