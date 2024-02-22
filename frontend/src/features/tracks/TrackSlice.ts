import { createSlice } from '@reduxjs/toolkit';
import { Track } from '../../types';
import { RootState } from '../../app/store';
import { fetchTracks } from './TracksThunks';


interface trackState {
  tracks: Track[];


  trackLoading: boolean;
}

const initialState: trackState = {
  tracks: [],

  trackLoading: false,
};

const TrackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setState: (state: trackState, {payload: tracks}) => {
      state.tracks = tracks
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state: trackState) => {
      state.trackLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state: trackState, {payload: tracks}) => {
      state.trackLoading = false;
      state.tracks = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state: trackState) => {
      state.trackLoading = false;
    });
  }
});

export const trackReducer = TrackSlice.reducer;

export const selectTracks = (state: RootState) => state.track.tracks;

export const selectTracksCount = (state: RootState) => state.track.tracks.length;

export const selectOnloadingTrack = (state: RootState) => state.track.trackLoading;

