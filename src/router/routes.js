export const routes = [
	{
		path: "/",
		component: () => import("../views/Home.vue"),
		name: "home",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/posts/:id",
		component: () => import("../views/Post.vue"),
		name: "post",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/search",
		component: () => import("../views/Search.vue"),
		name: "search",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/explore",
		component: () => import("../views/Explore.vue"),
		name: "explore",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/reels",
		component: () => import("../views/Reels.vue"),
		name: "reels",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/messages",
		component: () => import("../views/Messages.vue"),
		name: "messages",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/notifications",
		component: () => import("../views/Notifications.vue"),
		name: "notifications",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/create",
		component: () => import("../views/Create.vue"),
		name: "create",
		meta: {
			layout: "Main",
		},
	},
	{
		path: "/auth",
		component: () => import("../views/Auth.vue"),
		name: "auth",
		meta: {
			layout: "FullWidth",
		},
		beforeEnter(to, from, next) {
			if (localStorage.getItem("isAuth")) {
				next({
					name: "profile",
					params: { user: localStorage.getItem("isAuth") },
				});
			} else {
				next();
			}
		},
	},
	{
		path: "/profile/:user?/:tab?",
		component: () => import("../views/Profile.vue"),
		name: "profile",
		meta: {
			layout: "FullWidth",
		},
		beforeEnter(to, from, next) {
			if (!localStorage.getItem("isAuth")) {
				next({ name: "auth" });
			} else {
				next();
			}
		},
	},
	{
		path: "/profile/:user/:tab/:photo",
		component: () => import("../views/ProfilePhoto.vue"),
		name: "profile-photo",
		meta: {
			layout: "FullWidth",
		},
	},
	{
		path: "/profile/:user/:tab/:like",
		component: () => import("../views/ProfileLike.vue"),
		name: "profile-like",
		meta: {
			layout: "FullWidth",
		},
	},
	// {
	//   path: "/profile/:user/:tab/:collection",
	//   component: () => import("../views/ProfileCollection.vue"),
	//   name: "profile-collection",
	//   meta: {
	//     layout: "FullWidth",
	//   },
	// },
	{
		path: "/profile/:user/:tab/:collection/:collectionId",
		component: () => import("../views/ProfileCollectionItem.vue"),
		name: "profile-collection-item",
		meta: {
			layout: "FullWidth",
		},
	},
	{
		path: "/profile/:user/:tab/:collection/:collectionId/:photo",
		component: () => import("../views/ProfileCollectionItemPhoto.vue"),
		name: "profile-collection-item-photo",
		meta: {
			layout: "FullWidth",
		},
	},
	{
		path: "/:notFound(.*)*",
		component: () => import("../views/NotFound.vue"),
		name: "404",
		meta: {
			layout: "Main",
		},
	},
];
