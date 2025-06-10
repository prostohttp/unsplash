import { createApi } from "unsplash-js";

const ACCESS = import.meta.env.VITE_ACCESS_KEY;
export const authRequest = () => {
	return createApi({
		accessKey: ACCESS,
	});
};
