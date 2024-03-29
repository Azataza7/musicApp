export interface Artist {
  _id: string;
  name: string;
  information: string;
  image: string | null;
  isPublished: boolean;
}

export interface ArtistData {
  name: string;
  information: string;
  image: File | null;
  token: string;
}

export interface Album {
  _id: string;
  name: string;
  artist: Artist;
  date_release: number;
  image: string;
  isPublished: boolean;
}

export interface AlbumData {
  name: string;
  artist: Artist | null;
  date_release: number;
  image: File | null;
  token: string;
}

export interface Track {
  _id: string;
  name: string;
  album: Album;
  artist: Artist;
  durationTime: string;
  trackNumber: number;
  isPublished: boolean;
}

export interface TrackData {
  name: string;
  album: Album | null;
  artist: Artist | null;
  durationTime: string;
  token: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  avatar: string;
  displayName: string;
  googleID: string | null;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface trackHistoryType {
  _id: string;
  datetime: string;
  user: User;
  track: Track;
}

export interface trackHistoryTypeResponse {
  message: string;
  trackHistory: trackHistoryType;
}

export interface trackHistoryRequest {
  track: string;
  token: string;
}

