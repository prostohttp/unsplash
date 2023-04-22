import { defineStore } from "pinia";
import { shallowRef } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const userInfo = shallowRef({});
  const setUser = (data) => {
    userInfo.value = data;
  };
  return {
    userInfo,
    setUser,
  };
});
