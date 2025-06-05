import { mount } from "@vue/test-utils";
import AppFeedItemHeader from "@/components/AppFeedItemHeader.vue";

describe("Check component props and HTML", () => {
	test("Props input and HTML output", () => {
		const link = "https://example.com/";
		const image = "https://example.com/images/image.png";
		const username = "username";

		const wrapper = mount(AppFeedItemHeader, {
			props: {
				item: {
					user: {
						links: {
							html: link,
						},
						profile_image: {
							large: image,
						},
						username: username,
					},
				},
			},
		});
		const feedLink = wrapper
			.find("a.app-feed-link-image")
			.attributes("href");
		const imageLink = wrapper
			.find("img.app-feed-link-image")
			.attributes("src");
		const usernameLink = wrapper.find("a.app-feed-link-username").text();

		expect(feedLink).toBe(link);
		expect(imageLink).toBe(image);
		expect(usernameLink).toBe(username);
	});
});
