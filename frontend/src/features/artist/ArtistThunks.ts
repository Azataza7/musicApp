import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist } from '../../types';

export const fetchArtists = createAsyncThunk<Artist[], Artist[]>(
  'artists',
  async () => {
    const response = await axiosApi.get('/artist');
    return response.data;
  }
);