import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnloadingTrack, selectTracks } from './TrackSlice';
import { fetchTracks } from './TracksThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Track } from '../../types';
import TracksItem from './TracksItem';
import { apiURL } from '../../constants';
import { selectUser } from '../users/usersSlice';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const tracks: Track[] = useAppSelector(selectTracks);
  const onLoading: boolean = useAppSelector(selectOnloadingTrack);
  const albumId = useParams().id.toString();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const tracksContainer: JSX.Element[] = tracks.map((track) => (
    <TracksItem key={track._id} track={track}/>
  ));

  if (onLoading) {
    return <CircularProgress/>;
  }

  return (
    <Grid component="div" sx={{display: 'flex', gap: '20px', flexWrap: 'wrap', bgcolor: '#121212'}}>
      <Grid component="div"
            sx={{
              width: '100%',
              padding: '80px',
              backgroundImage: `url(${apiURL + '/' + tracks[0]?.album.artist.image})`,
              borderRadius: '8px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right'
            }}
      >
        <Typography variant="h3">{tracks[0]?.album.artist.name}</Typography>
        <Typography variant="h6">{tracks[0]?.album.name}</Typography>
      </Grid>
      {tracksContainer}
    </Grid>
  );
};

export default Tracks;