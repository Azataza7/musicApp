import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectOnloadingArtist } from './ArtistSlice';
import { fetchArtists } from './ArtistThunks';
import { CircularProgress, Grid } from '@mui/material';
import { Album, Artist } from '../../types';
import ArtistItem from './ArtistItem';

const Artist = () => {
  const dispatch = useAppDispatch();
  const artists: Artist[] = useAppSelector(selectArtists);
  const onLoading: boolean = useAppSelector(selectOnloadingArtist);


  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (onLoading) {
    return <CircularProgress
      sx={{position: 'absolute', top: '45%', left: '48%'}}/>;
  }

  const ArtistContainer: JSX.Element[] = artists.map((artist) => (
    <ArtistItem key={artist._id} artist={artist}/>
  ));

  return (
    <>
      <Grid component="div" sx={{display: "flex", gap: '20px', flexWrap: "wrap"}}>
        {ArtistContainer}
      </Grid>
    </>
  );
};

export default Artist;