import { Container, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Artist from './features/artist/Artist';
import AppToolbar from './Components/UI/AppToolbar/AppToolbar';
import Album from './features/album/Album';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './Components/TrackHistory/TrackHistory';
import AddArtist from './features/artist/AddArtist';
import AddAlbum from './features/album/AddAlbum';
import AddTrack from './features/tracks/AddTrack';

const App = () => {

  return (
    <>
      <main>
        <Container maxWidth="fixed">
          <header>
            <AppToolbar/>
          </header>
          <Routes>
            <Route path="/" element={(<Artist/>)}/>
            <Route path="/albums/:id" element={(<Album/>)}/>
            <Route path="/tracks/:id" element={(<Tracks/>)}/>
            <Route path="add-artist" element={(<AddArtist/>)}/>
            <Route path="add-album" element={(<AddAlbum/>)}/>
            <Route path="add-track" element={(<AddTrack/>)}/>


            <Route path="/register" element={(<Register/>)}/>
            <Route path="/track_history" element={(<TrackHistory/>)}/>
            <Route path="/login" element={(<Login/>)}/>
            <Route path="*" element={(
              <Typography variant="h3">Not Found!</Typography>
            )}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
