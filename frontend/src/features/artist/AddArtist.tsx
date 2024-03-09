import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, Input, TextField } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ArtistData, User } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { createArtist } from './ArtistThunks';
import { useNavigate } from 'react-router-dom';

const AddArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);


  const [artistData, setArtistData]: ArtistData = useState(
    {
      name: '',
      information: '',
      image: null,
      token: user.token
    }
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setArtistData({
      ...artistData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArtistData({
        ...artistData,
        image: e.target.files[0],
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createArtist(artistData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{backgroundColor: '#c6c3c3', padding: '20px'}}>
      <TextField
        label="Name"
        name='name'
        value={artistData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Grid component="div" sx={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
        <FileUploadIcon/>
        <Input
          type="file"
          name="image"
          onChange={handleFileChange}
        />
      </Grid>
      <TextField
        label="Information"
        name='information'
        value={artistData.information}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Artist
      </Button>
    </form>
  );
};

export default AddArtist;
