import { createApi } from "unsplash-js";

const ACCESS = import.meta.env.VITE_ACCESS_KEY;
export const authRequest = () => {
  return createApi({
    accessKey: "oNgDMSlqsaT4bLMGVRNwNsoW4pbjBwm5lYFyDkq30MI",
  });
};
