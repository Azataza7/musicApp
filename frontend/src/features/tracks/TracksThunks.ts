import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks',
  async (albumId) => {
    const response = await axiosApi.get(`/track/?album=${albumId}`);

    return response.data;
  }
);