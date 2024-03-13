import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAlbum, selectOnloadingAlbum } from './AlbumSlice';
import { fetchArtistAlbums } from './AlbumThunks';
import { CircularProgress, Grid } from '@mui/material';
import { Album, User } from '../../types';
import AlbumItem from './AlbumItem';
import { selectUser } from '../users/usersSlice';

const Album = () => {
  const dispatch = useAppDispatch();

  const artistId = useParams().id.toString();
  const albums: Album[] = useAppSelector(selectAlbum);
  const onLoading: boolean = useAppSelector(selectOnloadingAlbum);
  const user: User | null = useAppSelector(selectUser);

  console.log(user)

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
    <Grid component="div"
          sx={{
            display: 'flex', gap: '20px', flexWrap: 'wrap', bgcolor: '#121212',
            padding: '15px', borderBottomLeftRadius: 8, borderBottomRightRadius: 8
          }}
    >
      {albumContainer}
    </Grid>
  );
};

export default Album;