import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchArtistAlbums = createAsyncThunk<Album[], string>(
  'albums',
  async (artistId) => {
    const response = await axiosApi.get(`/albums/?artist=${artistId}`);

    return response.data
  }
);