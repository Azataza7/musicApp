import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOnloadingTrack, selectTracks } from './TrackSlice';
import { fetchTracks } from './TracksThunks';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const onLoading = useAppSelector(selectOnloadingTrack);
  const albumId = useParams().id.toString();

  useEffect(() => {
    dispatch(fetchTracks(albumId))
  }, [dispatch, albumId])

  console.log(tracks)

  if (onLoading) {
    return <CircularProgress/>
  }

  const tracksContainer: JSX.Element[] =

  return (
    <div>
      
    </div>
  );
};

export default Tracks;