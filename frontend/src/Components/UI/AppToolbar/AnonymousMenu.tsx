import React from 'react';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
      <Grid component="div" sx={{display: 'flex', gap: 2}}>
        <Button component={NavLink} to="/register" color="inherit" sx={{
          color: '#a7a7a7', bgcolor: 'transparent', fontWeight: 700, transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            color: '#FFFFFF'
          }
        }}>
          Sign up
        </Button>
        <Button component={NavLink} to="/login" color="inherit" sx={{
          color: '#000', fontWeight: 700, bgcolor: '#FFF', padding: 2, borderRadius: 10,
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            bgcolor: '#FFF',
          }
        }}>
          Sign In
        </Button>
      </Grid>
    </>
  );
};

export default AnonymousMenu;