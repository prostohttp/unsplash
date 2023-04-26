<script setup>
//Stores
//Vars

const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  route: {
    type: Object,
    required: true,
  },
});
// Handlers

// Hooks
</script>

<template>
  <router-link
    :to="{
      name: route.name,
      params: {
        user: item.user.username,
        tab: route.tab,
        [route.param]: item.id,
      },
    }"
    :id="item.id"
  >
    <img
      :src="item.urls.small"
      :alt="item.alt_description"
      class="w-full rounded-[3px]"
    />
  </router-link>
</template>
