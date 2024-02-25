import React, { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Grid } from '@mui/material';
import { selectUser } from '../../features/users/usersSlice';
import { selectTracksHistoryList } from '../../features/tracks/TrackSlice';
import { fetchUserTrackHistory } from '../../features/tracks/TracksThunks';
import { trackHistoryType, User } from '../../types';
import TrackHistoryItem from './TrackHistoryItem';
import { useNavigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user: User = useAppSelector(selectUser)
  const historyList: trackHistoryType[] = useAppSelector(selectTracksHistoryList);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchUserTrackHistory(user?.token))
  }, [dispatch, user])

  const trackHistoryContainer: JSX.Element[] = historyList.map((track) => (
    <TrackHistoryItem key={track._id} trackItem={track}/>
  ))

  return (
    <>
      <Grid component="div" sx={{ bgcolor: '#121212'}}>
        {trackHistoryContainer}
      </Grid>
    </>
  );
};

export default TrackHistory;