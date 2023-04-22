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
      class="relative px-[16px] py-[70px] iphone:m-auto iphone:w-[700px] iphone:min-w-[500px] iphone:max-w-[630px] iphone:pt-[30px] ipad:max-w-full mac:min-w-[800px] mac:max-w-[1013px] imac:min-w-[1013px]"
    >
      <slot />
    </section>
  </main>
</template>
