import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userInfo = ref(null);
  const setUser = (data) => {
    userInfo.value = data;
  };
  return {
    userInfo,
    setUser,
  };
});
