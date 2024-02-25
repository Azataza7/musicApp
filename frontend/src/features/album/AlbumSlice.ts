import { createSlice } from '@reduxjs/toolkit';
import { Album } from '../../types';
import { RootState } from '../../app/store';
import { fetchAlbums, fetchArtistAlbums } from './AlbumThunks';


interface albumState {
  albums: Album[];
  albumItem: Album | null;

  albumLoading: boolean;
  albumItemLoading: boolean;
}

const initialState: albumState = {
  albums: [],
  albumItem: null,

  albumLoading: false,
  albumItemLoading: false,
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

    builder.addCase(fetchAlbums.pending, (state: albumState) => {
      state.albumItemLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state: albumState, {payload: album}) => {
      state.albumItemLoading = false;
      state.albumItem = album;
    });
    builder.addCase(fetchAlbums.rejected, (state: albumState) => {
      state.albumItemLoading = false;
    });
  }
});

export const albumReducer = AlbumSlice.reducer;

export const selectAlbum = (state: RootState) => state.album.albums;
export const selectAlbumItem = (state: RootState) => state.album.albumItem;

export const selectOnloadingAlbum = (state: RootState) => state.album.albumLoading;
export const selectOnloadingAlbumItem = (state: RootState) => state.album.albumItemLoading;

