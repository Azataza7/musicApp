import React from 'react';
import { Album } from '../../types';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL } from '../../constants';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectTracksCount } from '../tracks/TrackSlice';

interface Props {
  album: Album;
}

const AlbumItem: React.FC<Props> = ({album}) => {
  const tracksCount = useAppSelector(selectTracksCount);


  return (
    <Link to={`/tracks/${album._id}`}
          style={{
            flexBasis: '50%',
            textDecoration: 'none'
          }}>
      <Card
        sx={{
          display: 'flex',
          bgcolor: 'transparent',
          padding: '10px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'lightgray',
            opacity: 0.99,
          }
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', flexBasis: '53%'}}>
          <CardContent sx={{flex: '1 0 auto', color: '#FFF'}}>
            <Typography component="div" variant="h6">
              {album.name}
            </Typography>
            <Typography
              sx={{color: '#FFF'}}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {album.date_release}
            </Typography>
            <Typography
              sx={{color: '#FFF'}}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Songs: {tracksCount}
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{width: 151, flexBasis: '40%'}}
          image={apiURL + '/' + album.image}
          alt={album.name + ' image'}
        />
      </Card>
    </Link>
  );
};

export default AlbumItem;