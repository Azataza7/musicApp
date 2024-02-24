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
            flexBasis: '33%',
            textDecoration: 'none',
          }}>
      <Card
        sx={{
          display: 'flex', flexWrap: 'wrap', justifyContent: "center",
          bgcolor: '#181818', cursor: 'pointer', height: '290px', padding: '5px',
          transition: 'background-color 0.4s ease',
          '&:hover': {
            bgcolor: "#3d3c3c",
            opacity: 0.999,
          }
        }}
      >
        <Box sx={
          {display: 'flex', flexDirection: 'column'}
        }>
          <CardContent sx={{ color: '#FFF'}}>
            <CardMedia
              component="img"
              sx={{maxHeight: 316 ,maxWidth: 171, flexBasis: '20%'}}
              image={apiURL + '/' + album.image}
              alt={album.name + ' image'}
            />
            <Typography component="div" variant="p">
              {album.name}
            </Typography>
            <Typography
              sx={{color: '#a7a7a7'}}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Date release: {album.date_release}
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
      </Card>
    </Link>
  );
};

export default AlbumItem;