import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artist/ArtistSlice';
import { albumReducer } from '../features/album/AlbumSlice';
import { trackReducer } from '../features/tracks/TrackSlice';


export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;