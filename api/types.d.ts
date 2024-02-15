import mongoose from 'mongoose';

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

export interface AlbumTypeWithId extends AlbumType {
  _id: string;
}

export interface TrackType {
  name: string;
  album: AlbumType;
  durationTime: string;
}

export interface UserFields {
  _id: string;
  username: string;
  password: string;
  token: string;
}
