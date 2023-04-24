<script setup>
import { useProfileStore } from "@/stores/profile.js";

// Stores
const profileStore = useProfileStore();
// Vars
const emit = defineEmits(["change-tab"]);
const { titles, activeTab, content } = defineProps({
  titles: {
    type: Array,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  activeTab: {
    type: Number,
    default: 0,
  },
});
// Handlers
// Hooks
</script>

<template>
  <div class="tabs">
    <ul class="mb-[40px] flex gap-[30px] border-b border-grey">
      <li
        v-for="(title, index) in titles"
        :key="title"
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
            'active border-b-[#000] text-[#111]': activeTab === index,
          },
        ]"
      >
        <component
          :is="title.icon"
          class="w-[16px] fill-[#d1d1d1] group-hover:fill-[#111]"
        />
        <span class="group-hover:text-[#111]">
          {{ title.label }}
        </span>
        <span class="group-hover:text-[#111]">
          {{ profileStore.userInfo[title.count] }}</span
        >
      </li>
    </ul>
    <div>
      <component :is="content" />
    </div>
  </div>
</template>
