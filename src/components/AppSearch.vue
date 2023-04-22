<script setup>
import mobileSearch from "~/svg/mobile-search.svg";

// Vars
const { modelValue } = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:model-value"]);
// Handlers
// Hooks
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:model-value', $event.target.value)"
    placeholder="Поиск"
    class="peer h-[36px] w-[268px] rounded-[8px] bg-[#efefef] py-[3px] pl-[45px] pr-[16px] text-[16px] text-[#000000] placeholder-[#737373] outline-none transition-all duration-75 focus:pl-[16px]"
  />
  <img
    :src="mobileSearch"
    alt="search"
    class="absolute left-[16px] top-[10px] transition-all peer-focus:hidden"
  />
</template>
