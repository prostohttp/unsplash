<script setup>
import { useProfileStore } from "@/stores/profile.js";

//Stores
const profileStore = useProfileStore();
//Vars
const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
// Handlers

// Hooks
</script>

<template>
  <div :id="item.id" class="block">
    <router-link
      :to="{
        name: 'profile-collection',
        params: {
          user: item.user.username,
          collection: item.title,
        },
      }"
      v-if="item.preview_photos.length > 3"
      class="grid h-[250px] w-full grid-cols-3 grid-rows-2 gap-[3px] overflow-hidden rounded-[6px]"
    >
      <img
        :src="item.preview_photos[0].urls.small"
        :alt="item.title"
        class="col-span-2 row-span-2 h-full w-full object-cover object-center"
      />
      <img
        :src="item.preview_photos[1].urls.small"
        :alt="item.title"
        class="col-span-1 row-span-1 h-full w-full object-cover object-center"
      />
      <img
        :src="item.preview_photos[2].urls.small"
        :alt="item.title"
        class="col-span-1 row-span-1 h-full w-full object-cover object-center"
      />
    </router-link>
    <template v-else>
      <img
        :src="item.preview_photos[0].urls.small"
        :alt="item.title"
        class="h-[250px] w-full rounded-[6px] object-cover object-center"
      />
    </template>

    <span class="mt-[15px] block text-[18px] font-semibold text-body">
      {{ item.title }}
    </span>
    <div class="mb-[15px] mt-[5px] flex gap-[10px] text-[14px] text-[#767676]">
      <span>{{ item.total_photos }} фото</span>
      <span
        >Создано
        <a
          :href="item.links.html"
          target="_blank"
          class="cursor-default text-body hover:underline hover:underline-offset-2"
        >
          {{ item.user.name }}
        </a>
      </span>
    </div>
    <div class="flex flex-wrap gap-[9px]" v-if="item.tags.length">
      <span
        v-for="tag in item.tags"
        class="flex rounded-[2px] bg-[#eee] px-[8px] text-[14px] text-[#767676]"
      >
        {{ tag.title }}
      </span>
    </div>
  </div>
</template>
