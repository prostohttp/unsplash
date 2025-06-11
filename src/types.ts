import type { Component } from "vue";

export enum ITabCount {
	"total-photos" = "total_photos",
	"total_likes" = "total_likes",
	"total_collections" = "total_collections",
}

export interface ITab {
	label: string;
	name: string;
	count: ITabCount;
	icon: Component;
}
