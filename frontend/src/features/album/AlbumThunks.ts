import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchArtistAlbums = createAsyncThunk<Album[], string, {rejectValue: string}>(
  'albums/fetchArtistAlbums',
  async (artistId) => {
    const response = await axiosApi.get(`/albums/?artist=${artistId}`);

    return response.data;
  }
);

export const fetchAlbums = createAsyncThunk<Album, string, { rejectValue }>(
  'album/byId',
  async (artistId, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get(`/albums/${artistId}`);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
    }
  }
);
