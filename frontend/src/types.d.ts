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

export interface Track {
  _id: string;
  name: string;
  album: Album;
  durationTime: string;
  trackNumber: number;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
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