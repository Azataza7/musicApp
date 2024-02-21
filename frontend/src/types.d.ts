export interface Artist {
  _id: string;
  name: string;
  information: string;
  image: string;
}

export interface Album {
  _id: string;
  name: string;
  artist: Artist;
  date_release: number;
  image: string;
}