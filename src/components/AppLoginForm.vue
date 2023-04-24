<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { authRequest } from "@/api/unsplash.js";
import { useProfileStore } from "@/stores/profile.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Stores
const profileStore = useProfileStore();
// Vars
const router = useRouter();
const error = ref("");
const {
  value: login,
  errorMessage,
  meta,
} = useField(
  "login",
  yup.string().required("Обязательное поле").min(3, "Не менее 3 символов")
);
const { handleSubmit } = useForm();
const api = authRequest();

// Handlers

// Hooks

// Handlers
const loginHandler = handleSubmit(async () => {
  if (login) {
    const res = await api.users.get({ username: login.value });
    if (res.errors) {
      error.value = "Такого пользователя нет, попробуйте еще раз";
    } else {
      profileStore.setUser(res.response);
      localStorage.setItem("isAuth", profileStore.userInfo.username);
      await router.push({
        name: "profile",
        params: { user: profileStore.userInfo.username, tab: 0 },
      });
    }
  }
});
// Hooks
</script>

<template>
  <div class="flex flex-col">
    <form @submit="loginHandler" class="flex flex-col">
      <input
        type="text"
        v-model="login"
        @input="error = ''"
        placeholder="Введите ваш ник"
        class="min-w-full"
        :class="{ 'border border-accent': errorMessage }"
      />
      <span v-if="errorMessage" class="mt-[4px]">
        {{ errorMessage }}
      </span>
      <span v-if="error && !errorMessage" class="mt-[4px]">
        {{ error }}
      </span>
      <button
        class="mt-[20px] disabled:bg-grey disabled:text-black"
        :disabled="!meta.valid"
      >
        Найти меня на unsplash
      </button>
    </form>
  </div>
</template>
