import React from 'react';
import { Artist } from '../../types';
import {
  Card,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { apiURL } from '../../constants';

interface Props {
  artist: Artist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  return (
    <Card
      sx={{
        width: '200px',
        padding: '20px',
        bgcolor: "transparent",
        transition: "background-color .3s ease",
        borderRadius: "8px",
        cursor: "pointer",
        '&:hover': {
          bgcolor: "lightgray",
          opacity: 0.99,
        }
      }}>
      <CardMedia
        sx={{
          borderRadius: '8px',
        }}
        component="img"
        height="200"
        image={apiURL + '/' + artist.image}
        alt={artist.name + ' image'}
      />
      <CardHeader
        sx={{
          color: '#FFF',
        }}
        title={artist.name}
      />
    </Card>
  );
};

export default ArtistItem;