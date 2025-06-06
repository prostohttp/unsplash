<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
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

// Handlers
const loginHandler = handleSubmit(async () => {
	if (login) {
		const res = await profileStore.apiUsersGet(login.value);

		if (res.errors) {
			error.value = "Такого пользователя нет, попробуйте еще раз";
		} else {
			profileStore.setUser(res.response);
			localStorage.setItem("isAuth", profileStore.userInfo.username);
			await router.push({
				name: "profile",
				params: { user: profileStore.userInfo.username },
			});
		}
	}
});
// Hooks
</script>

<template>
	<div class="flex flex-col">
		<form class="flex flex-col" @submit="loginHandler">
			<input
				v-model.trim="login"
				:class="{ 'border border-accent': errorMessage }"
				class="min-w-full"
				placeholder="Введите ваш ник"
				type="text"
				@input="error = ''"
			/>
			<span v-if="errorMessage" class="mt-[4px]">
				{{ errorMessage }}
			</span>
			<span v-if="error && !errorMessage" class="mt-[4px]">
				{{ error }}
			</span>
			<button
				:disabled="!meta.valid"
				class="mt-[20px] disabled:bg-grey disabled:text-black"
			>
				Найти на unsplash
			</button>
		</form>
	</div>
</template>
