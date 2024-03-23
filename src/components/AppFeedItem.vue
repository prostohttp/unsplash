<script setup>
import { getDateDiff, numWord } from "@/helpers/functions.js";
import likeIcon from "~/svg/notifications-icon.svg";

// vars
const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
// Handlers
const likeHandler = () => {
  alert("Здесь мог быть твой лайк");
};
// Hooks
</script>

<template>
  <div
    class="mb-[12px] flex flex-col gap-[10px] border-b border-grey py-[12px] text-[14px]"
    :id="item.id"
  >
    <div class="mb-[8px] flex items-center gap-[10px]">
      <div
        class="flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-full border-[2px] border-accent"
      >
        <a
          :href="item.user.links.html"
          target="_blank"
          class="border-[2px] border-white"
        >
          <img
            :src="item.user.profile_image.large"
            :alt="item.user.name"
            class="h-[35px] w-[35px] rounded-full object-cover object-center"
          />
        </a>
      </div>
      <a :href="item.user.links.html" target="_blank" class="font-semibold">
        {{ item.user.username }}
      </a>
      <span class="text-dark-grey">
        {{ getDateDiff(new Date(), new Date(item.created_at)) }}
      </span>
    </div>
    <div class="overflow-hidden rounded-[3px]">
      <router-link :to="{ name: 'post', params: { id: item.id } }">
        <img
          :src="item.urls.small"
          :alt="item.alt_description"
          class="w-auto"
        />
      </router-link>
    </div>
    <div>
      <div class="mb-[15px] mt-[5px] flex">
        <a
          href=""
          @click.prevent="likeHandler"
          class="flex items-center justify-center"
        >
          <img :src="likeIcon" alt="like" />
        </a>
      </div>
      <div class="font-semibold">
        {{ item.likes }} {{ numWord(item.likes) }}
      </div>
    </div>
  </div>
</template>
@/helpers/functions.js