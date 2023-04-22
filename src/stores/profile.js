import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userInfo = ref({});
  const setUser = (data) => {
    userInfo.value = data;
  };
  return {
    userInfo,
    setUser,
  };
});
