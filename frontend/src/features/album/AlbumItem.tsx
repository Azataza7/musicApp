import React from 'react';
import { Album } from '../../types';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { apiURL } from '../../constants';
import { Link } from 'react-router-dom';

interface Props {
  album: Album;
}

const AlbumItem: React.FC<Props> = ({album}) => {

  return (
    <Link to={`/tracks/${album._id}`}
          style={{
            flexBasis: '100%',
            textDecoration: 'none',
          }}>
      <Card
        sx={{
          display: 'flex',
          bgcolor: 'transparent',
          padding: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.4s ease',
          '&:hover': {
            bgcolor: "#3d3c3c",
            opacity: 0.999,
          }
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', flexBasis: '73%'}}>
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
              Songs:
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{maxHeight: 316 ,maxWidth: 151, flexBasis: '20%'}}
          image={apiURL + '/' + album.image}
          alt={album.name + ' image'}
        />
      </Card>
    </Link>
  );
};

export default AlbumItem;