export interface ArtistType {
  name: string;
  image: string | null;
  information: string | null;
}

export interface AlbumType {
  name: string;
  artist: ArtistType;
  date_release: string;
  image: string | null;
}
