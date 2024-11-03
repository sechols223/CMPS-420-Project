import { PhotoDto } from "./photo-dto";


export interface AlbumDto{
    id: number;
    name: string;
    photos: Array<PhotoDto>;
}