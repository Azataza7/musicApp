import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist, ArtistData, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artist[], Artist[]>(
  'artists',
  async () => {
    const response = await axiosApi.get('/artist');
    return response.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistData, { rejectValue: ValidationError }>(
  'artists/create',
  async (artistData, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('name', artistData.name);
      formData.append('information', artistData.information);

      if (artistData.image) {
        formData.append('image', artistData.image);
      }

      await axiosApi.post('/artist', formData,
        {
          headers: {
            Authorization: artistData.token
          }
        });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);