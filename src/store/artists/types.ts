export interface IArtistsState {
  artists: IArtist[];
  status: string;
  data: IArtistById | null;
}
export interface IArtist {
  genres: string[];
  _id: string;
  __v: number;
  mainPainting: IMainPainting;
  description: string;
  name: string;
  yearsOfLife: string;
}
export interface IArtistById {
  paintings: IMainPainting[];
  genres: { _id: string; name: string }[];
  _id: string;
  description: string;
  mainPainting: IMainPainting;
  name: string;
  yearsOfLife: string;
  avatar: IImage;
  __v: number;
}
export interface IMainPainting {
  artist: string;
  image: IImage;
  name: string;
  yearOfCreation: string;
  _id: string;
}
export interface IImage {
  _id: string;
  original: string;
  src: string;
  src2x: string;
  webp: string;
  webp2x: string;
}
