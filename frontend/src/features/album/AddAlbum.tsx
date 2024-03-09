import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { AlbumData, Artist, User } from '../../types';
import { selectUser } from '../users/usersSlice';
import { selectArtists } from '../artist/ArtistSlice';
import { Button, Grid, Input, MenuItem, Select, TextField, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { fetchArtists } from '../artist/ArtistThunks';
import { createAlbum } from './AlbumThunks';

const AddAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User = useAppSelector(selectUser);
  const artists: Artist[] | null = useAppSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [albumData, setAlbumData] = useState<AlbumData>({
    name: '',
    artist: null,
    date_release: 0,
    image: null,
    token: user.token
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAlbumData({
      ...albumData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAlbumData({
        ...albumData,
        image: e.target.files[0],
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createAlbum(albumData));
    console.log(albumData)
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{backgroundColor: '#c6c3c3', padding: '20px'}}>
        <TextField
          label="Name"
          name="name"
          value={albumData.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Grid component="div" sx={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
          <FileUploadIcon/>
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </Grid>
        <Input
          type="number"
          label="date_release"
          name="date_release"
          placeholder="date_release"
          value={albumData.date_release}
          onChange={handleChange}
          onKeyPress={(e) => {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(e.charCode);
            if (!pattern.test(inputChar)) {
              e.preventDefault();
            }
          }}
        />

        <Select
          sx={{margin: '20px 0'}}
          value={albumData.artist || ''}
          onChange={handleChange}
          name="artist"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="" disabled>
            Choose artist
          </MenuItem>
          {artists?.map((artist) => (
            <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
          ))}
        </Select>
        <Grid component="div">
          <Button type="submit" variant="contained" color="primary">
            Add Album
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default AddAlbum;