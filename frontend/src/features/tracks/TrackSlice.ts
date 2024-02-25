import { createSlice } from '@reduxjs/toolkit';
import { Track, trackHistoryType } from '../../types';
import { RootState } from '../../app/store';
import { createUserTrackHistory, fetchTracks, fetchUserTrackHistory } from './TracksThunks';


interface trackState {
  tracks: Track[];
  trackHistory: trackHistoryType | null,
  trackHistoryList: trackHistoryType[],

  trackLoading: boolean,
  trackHistoryLoading: boolean,
  tracksHistoryListLoading: boolean
}

const initialState: trackState = {
  tracks: [],
  trackHistory: null,
  trackHistoryList: [],


  trackLoading: false,
  trackHistoryLoading: false,
  tracksHistoryListLoading: false

};

const TrackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setState: (state: trackState, {payload: tracks}) => {
      state.tracks = tracks;
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

    builder.addCase(createUserTrackHistory.pending, (state: trackState) => {
      state.trackHistoryLoading = true;
    });
    builder.addCase(createUserTrackHistory.fulfilled, (state: trackState, {payload: trackData}) => {
      state.trackHistoryLoading = false;
      state.trackHistory = trackData.trackHistory;
    });
    builder.addCase(createUserTrackHistory.rejected, (state: trackState, {payload: error}) => {
      state.trackHistoryLoading = false;
    });

    builder.addCase(fetchUserTrackHistory.pending, (state: trackState) => {
      state.tracksHistoryListLoading = true;
    });
    builder.addCase(fetchUserTrackHistory.fulfilled, (state: trackState, {payload: trackList}) => {
      state.tracksHistoryListLoading = false;
      state.trackHistoryList = trackList;
    });
    builder.addCase(fetchUserTrackHistory.rejected, (state: trackState, {payload: error}) => {
      state.tracksHistoryListLoading = false;
    });
  }
});

export const trackReducer = TrackSlice.reducer;

export const selectTracks = (state: RootState) => state.track.tracks;
export const selectTracksHistory = (state: RootState) => state.track.trackHistory;
export const selectTracksHistoryList = (state: RootState) => state.track.trackHistoryList;

export const selectOnloadingTrack = (state: RootState) => state.track.trackLoading;
export const selectOnloadingTrackHistory = (state: RootState) => state.track.tracksHistoryListLoading;

