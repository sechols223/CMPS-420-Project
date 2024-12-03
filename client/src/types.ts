export type PaginatedResponse<T> = {
  count: number;
  items: T[];
};

export type ImageGetDto = {
  _id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  imageData: string;
  location?: string;
};

export type AlbumGetDto = {
  _id: string;
  name: string;
  images: ImageGetDto[];
};

export type ImageUpdateDto = {
  id: string;
  name: string;
  tags: string[];
  description?: string;
  location?: string;
};
export type AlbumCreateDto ={ 
  name: string; 
  imageIds: string[]
}
