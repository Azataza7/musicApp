import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { fetchArtists } from './ArtistThunks';
import { RootState } from '../../app/store';


interface artistState {
  artists: Artist[];

  artistLoading: boolean;
}

const initialState: artistState = {
  artists: [],

  artistLoading: false,
};

const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setState: (state: artistState, {payload: artists}) => {
      state.artists = artists
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state: artistState) => {
      state.artistLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state: artistState, {payload: artists}) => {
      state.artistLoading = false;
      state.artists = artists;
    });
    builder.addCase(fetchArtists.rejected, (state: artistState) => {
      state.artistLoading = false;
    });
  }
});

export const artistReducer = ArtistSlice.reducer;

export const selectArtists = (state: RootState) => state.artist.artists;

export const selectOnloadingArtist = (state: RootState) => state.artist.artistLoading;

