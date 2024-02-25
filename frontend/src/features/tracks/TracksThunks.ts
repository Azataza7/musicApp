import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track, trackHistoryRequest, trackHistoryType, trackHistoryTypeResponse, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks',
  async (albumId) => {
    const response = await axiosApi.get(`/track/?album=${albumId}`);

    return response.data;
  }
);

export const createUserTrackHistory = createAsyncThunk<trackHistoryTypeResponse, trackHistoryRequest, { rejectValue: ValidationError }>(
  'track_history',
  async (data, {rejectWithValue}) => {

    try {
      const response = await axiosApi.post('/track_history', data, {
        headers: {
          Authorization: `${data.token}`
        }
      });

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const fetchUserTrackHistory = createAsyncThunk<trackHistoryType[], string, { rejectValue: ValidationError }>(
  'UserTrackHistory',
  async (userToken, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get('/track_history', {
        headers: {Authorization: `${userToken}`}
      });

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
    }
  }
);