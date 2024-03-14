import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectOnloadingArtist, selectOnLoadingNewArtist } from './ArtistSlice';
import { fetchArtists } from './ArtistThunks';
import { CircularProgress, Grid } from '@mui/material';
import { Artist, User } from '../../types';
import ArtistItem from './ArtistItem';
import { selectLogoutLoading, selectUser } from '../users/usersSlice';

const Artist = () => {
  const dispatch = useAppDispatch();
  const artists: Artist[] = useAppSelector(selectArtists);
  const onLoading: boolean = useAppSelector(selectOnloadingArtist);
  const logOutLoading: boolean = useAppSelector(selectLogoutLoading);
  const newArtistOnLoading: boolean = useAppSelector(selectOnLoadingNewArtist);

  useEffect(() => {
     dispatch(fetchArtists());

  }, [dispatch]);

  if (onLoading || logOutLoading || newArtistOnLoading) {
    return <CircularProgress
      sx={{position: 'absolute', top: '45%', left: '48%'}}/>;
  }

  const ArtistContainer: JSX.Element[] = artists.map((artist) => (
    <ArtistItem key={artist._id} artist={artist}/>
  ));

  return (
    <>
      <Grid component="div" sx={{
        display: 'flex', gap: '20px', flexWrap: 'wrap',
        bgcolor: '#121212', paddingTop: 2
      }}>
        {ArtistContainer}
      </Grid>
    </>
  );
};

export default Artist;