import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<RegisterResponse, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {

    const formData = new FormData();
    formData.append('email', registerMutation.email);
    formData.append('password', registerMutation.password);
    formData.append('displayName', registerMutation.displayName);

    if (registerMutation.avatar) {
      formData.append('avatar', registerMutation.avatar);
    }

    try {
      const response = await axiosApi.post('/users', formData);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const login = createAsyncThunk<RegisterResponse, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
    }
  }
);

export const googleLogin = createAsyncThunk<RegisterResponse, string, { rejectValue: GlobalError }>(
  'users/googleLogin',
  async (credential, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('users/google', {credential});

      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data as GlobalError);
      }

      throw e;
    }
  }
);

export const logOutUser = createAsyncThunk<void, string>(
  'users/logOut',
  async (token) => {
    await axiosApi.delete('/users/sessions', {
      headers: {
        Authorization: token
      }
    });
  }
);