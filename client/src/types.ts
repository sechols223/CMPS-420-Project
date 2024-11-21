
export type PaginatedResponse<T> = {
	count: number;
	items: T[]
}

export type ImageGetDto = {
	id: string;
	name: string;
	tags: string[];
	description: string;
	imageData: string;
	location?: string;
}

export type Album = {
	id: string;
	name: string;
	images: ImageGetDto[]
}