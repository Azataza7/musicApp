import React from 'react';
import { Artist } from '../../types';
import {
  Card,
  CardHeader,
  CardMedia,
} from '@mui/material';
import { apiURL } from '../../constants';
import { Link } from 'react-router-dom';

interface Props {
  artist: Artist;
}

const ArtistItem: React.FC<Props> = ({artist}) => {
  return (
    <Link to={`/albums/${artist._id}`}
          style={{textDecoration: "none"}}>
      <Card
        sx={{
          width: '200px',
          height: '85%',
          padding: '20px',
          bgcolor: 'transparent',
          transition: 'background-color 0.4s ease',
          borderRadius: '8px',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#3d3c3c',
            opacity: 0.999,
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
            textDecoration: "none"
          }}
          title={artist.name}
        />
      </Card>
    </Link>
  );
};

export default ArtistItem;