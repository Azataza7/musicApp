import { NavLink } from 'react-router-dom';
import { AppBar, Button, Grid, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{bgcolor: '#121212', borderTopLeftRadius: 8, borderTopRightRadius: 8,}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Smotify</Link>
          </Typography>
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
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;