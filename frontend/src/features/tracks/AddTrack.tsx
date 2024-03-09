import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Album, Artist, TrackData, User } from '../../types';
import { selectUser } from '../users/usersSlice';
import { createTrack } from './TracksThunks';
import { selectArtists } from '../artist/ArtistSlice';
import { selectAlbum } from '../album/AlbumSlice';
import { fetchArtists } from '../artist/ArtistThunks';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { fetchArtistAlbums } from '../album/AlbumThunks';

const AddTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User = useAppSelector(selectUser);
  const artists: Artist[] | null = useAppSelector(selectArtists);
  const albums: Album[] | null = useAppSelector(selectAlbum);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [trackData, setTrackData] = useState<TrackData>({
    name: '',
    album: null,
    artist: null,
    durationTime: '',
    token: user.token
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTrackData({
      ...trackData,
      [name]: value,
    });
  };

  const handleArtistChange = (artistId: string) => {
    setTrackData({
      ...trackData,
      artist: artistId,
    });
    dispatch(fetchArtistAlbums(artistId));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    console.log(trackData);
    await dispatch(createTrack(trackData));
    navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{backgroundColor: '#c6c3c3', padding: '20px'}}>
        <Grid component="div" sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="p" sx={{color: '#000', flexBasis: '24%'}}>
            Write track title:
          </Typography>
          <TextField
            sx={{flexBasis: '50%'}}
            label="Name"
            name="name"
            value={trackData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            label="duration track time"
            name="durationTime"
            value={trackData.durationTime}
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Grid>

        <Grid component="div" sx={{display: 'flex', alignItems: 'center', gap: 10}}>
          <Typography variant="p" sx={{color: '#000', flexBasis: '50%'}}>
            Choose artist:
          </Typography>
          <Select
            sx={{margin: '20px 0'}}
            value={trackData.artist || ''}
            onChange={(e) => handleArtistChange(e.target.value)}
            name="artist"
            variant="outlined"
            fullWidth
            required
          >
            {artists?.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid component="div" sx={{display: 'flex', alignItems: 'center', gap: 10}}>
          <Typography variant="p" sx={{color: '#000', flexBasis: '50%'}}>
            Choose albums:
          </Typography>
          <Select
            sx={{margin: '20px 0'}}
            value={trackData.album || ''}
            onChange={handleChange}
            name="album"
            variant="outlined"
            fullWidth
            required
          >
            {albums?.map((album) => (
              <MenuItem key={album._id} value={album._id}>{album.name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid component="div">
          <Button type="submit" variant="contained" color="primary">
            Add Track
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default AddTrack;
