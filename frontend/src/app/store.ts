import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artist/ArtistSlice';
import { albumReducer } from '../features/album/AlbumSlice';
import { trackReducer } from '../features/tracks/TrackSlice';
import { userReducer } from '../features/users/usersSlice';


export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
    users: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;