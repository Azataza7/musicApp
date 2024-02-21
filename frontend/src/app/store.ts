import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artist/ArtistSlice';


export const store = configureStore({
  reducer: {
    artist: artistReducer,

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;