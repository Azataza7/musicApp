import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { RootState } from '../../app/store';
import { fetchArtistAlbums } from './AlbumThunks';


interface albumState {
  albums: Album[];

  albumLoading: boolean;
}

const initialState: albumState = {
  albums: [],

  albumLoading: false,
};

const AlbumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setState: (state: albumState, {payload: albums}) => {
      state.albums = albums;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtistAlbums.pending, (state: albumState) => {
      state.albumLoading = true;
    });
    builder.addCase(fetchArtistAlbums.fulfilled, (state: albumState, {payload: albums}) => {
      state.albumLoading = false;
      state.albums = albums;
    });
    builder.addCase(fetchArtistAlbums.rejected, (state: albumState) => {
      state.albumLoading = false;
    });
  }
});

export const albumReducer = AlbumSlice.reducer;

export const selectAlbum = (state: RootState) => state.album.albums;

export const selectOnloadingAlbum = (state: RootState) => state.album.albumLoading;

