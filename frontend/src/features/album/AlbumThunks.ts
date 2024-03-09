import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumData, ArtistData, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchArtistAlbums = createAsyncThunk<Album[], string, { rejectValue: string }>(
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

export const createAlbum = createAsyncThunk<void, AlbumData, { rejectValue: ValidationError }>(
  'album/create',
  async (albumData, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('name', albumData.name);
      formData.append('artist', String(albumData.artist));

      if (albumData.image && albumData.date_release) {
        formData.append('date_release', String(albumData.date_release));
        formData.append('image', albumData.image);
      }

      await axiosApi.post('/albums', formData,
        {
          headers: {
            Authorization: albumData.token
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
