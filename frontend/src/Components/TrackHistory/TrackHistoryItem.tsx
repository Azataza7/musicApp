import React, { useEffect } from 'react';
import { Album, trackHistoryType } from '../../types';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { fetchAlbums } from '../../features/album/AlbumThunks';
import { useAppDispatch} from '../../app/hooks';

interface Props {
  trackItem: trackHistoryType;
}

const TrackHistoryItem: React.FC<Props> = ({trackItem}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums(trackItem.track.album));
  }, [dispatch, trackItem.track.album]);

  return (
    <Grid
      component="div"
      sx={{gap: 7, flexBasis: '90%', display: "flex", borderBottom: '3px solid #181818'}}>
      <Typography>{trackItem.track.artist.name}</Typography>
      <Typography>{trackItem.track.name}</Typography>
      <Typography>{dayjs(trackItem.datetime).format('YYYY-MM-DD HH:mm:ss')}</Typography>
    </Grid>
  );
};

export default TrackHistoryItem;