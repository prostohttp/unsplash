<script setup>
import AppTabsTitle from "@/components/AppTabs/AppTabsTitle.vue";
import AppTabsContent from "@/components/AppTabs/AppTabsContent.vue";

const {} = defineProps({
  titles: {
    type: Array,
    required: true,
  },
  contents: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="tabs">
    <div>
      <AppTabsTitle v-for="title in titles" />
    </div>
    <div>
      <AppTabsContent v-for="content in contents" />
    </div>
  </div>
</template>
