<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

// Stores

// Vars
const api = ref(null);
// Handlers

// Hooks
onMounted(() => {});
const route = useRoute();
</script>

<template>
  <div>{{ route.query.code }}</div>
</template>
