import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAlbum, selectOnloadingAlbum } from './AlbumSlice';
import { fetchArtistAlbums } from './AlbumThunks';
import { CircularProgress, Grid } from '@mui/material';
import { Album } from '../../types';
import AlbumItem from './AlbumItem';

const Album = () => {
  const dispatch = useAppDispatch();

  const artistId = useParams().id.toString();
  const albums: Album[] = useAppSelector(selectAlbum);
  const onLoading: boolean = useAppSelector(selectOnloadingAlbum);

  useEffect(() => {
    dispatch(fetchArtistAlbums(artistId));
  }, [dispatch, artistId]);


  const albumContainer: JSX.Element[] = albums.map((album) => (
    <AlbumItem key={album._id} album={album}/>
  ));

  if (onLoading) {
    return <CircularProgress/>;
  }

  return (
    <Grid component="div" sx={{display: "flex", gap: '20px', flexWrap: "wrap"}}>
      {albumContainer}
    </Grid>
  );
};

export default Album;