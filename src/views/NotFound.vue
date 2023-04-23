<script setup></script>

<template>
  <div>
    <h1 class="text-center text-[24px]">Такой страницы не существует!</h1>
    <router-link
      :to="{ name: 'home' }"
      class="mt-[15px] block text-center underline underline-offset-[3px]"
    >
      Перейти на главную
    </router-link>
  </div>
</template>
