import { createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import { createArtist, fetchArtists } from './ArtistThunks';
import { RootState } from '../../app/store';


interface artistState {
  artists: Artist[];

  artistLoading: boolean;
  createArtistLoading: boolean;
}

const initialState: artistState = {
  artists: [],

  artistLoading: false,
  createArtistLoading: false,
};

const ArtistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setState: (state: artistState, {payload: artists}) => {
      state.artists = artists;
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

    builder.addCase(createArtist.pending, (state: artistState) => {
      state.createArtistLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state: artistState) => {
      state.createArtistLoading = false;
    });
    builder.addCase(createArtist.rejected, (state: artistState) => {
      state.createArtistLoading = false;
    });
  }
});

export const artistReducer = ArtistSlice.reducer;

export const selectArtists = (state: RootState) => state.artist.artists;

export const selectOnloadingArtist = (state: RootState) => state.artist.artistLoading;
export const selectOnLoadingNewArtist = (state: RootState) => state.artist.createArtistLoading;

