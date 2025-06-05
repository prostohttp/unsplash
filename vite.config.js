import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	test: {
		environment: "jsdom",
		coverage: { reporter: ["text", "json", "html"] },
		// No need more imports like describe, test ...
		globals: true,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"~": fileURLToPath(new URL("./src/assets", import.meta.url)),
			"!": fileURLToPath(new URL("./", import.meta.url)),
		},
	},
});
