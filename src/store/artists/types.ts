export interface IArtistsState {
  artists: IArtist[];
  status: string;
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
export interface IMainPainting {
  artist: string;
  image: {
    _id: string;
    original: string;
    src: string;
    src2x: string;
    webp: string;
    webp2x: string;
  };
  name: string;
  yearOfCreation: string;
  _id: string;
}
