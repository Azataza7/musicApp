import React, { useState } from 'react';
import { Track, trackHistoryRequest } from '../../types';
import {
  Avatar,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { apiURL } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracksHistory } from './TrackSlice';
import { createUserTrackHistory } from './TracksThunks';
import { selectUser } from '../users/usersSlice';

interface Props {
  track: Track;
}

const TracksItem: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [data, setData] = useState<trackHistoryRequest>({
    track: track._id,
    token: user.token
  })

  const handleUserTrackHistory = () => {
    dispatch(createUserTrackHistory(data))
  }

  return (
    <Grid component="div" sx={{flexBasis: '100%'}}>
      <TableContainer component={Paper}>
        <Table aria-label="track-container">
          <TableHead>
            <TableRow sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <TableCell >{track.trackNumber}</TableCell>
              <TableCell> <Avatar src={apiURL + '/' + track.album.image}/></TableCell>
              <TableCell sx={{flexBasis: '30%'}}>{track.name}</TableCell>
              <TableCell>{track.durationTime}</TableCell>
              <TableCell >
                <PlayCircleFilledWhiteIcon
                  fontSize="large"
                  color="success"
                  cursor="pointer"
                  onClick={handleUserTrackHistory}
                />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

    </Grid>
  );
};

export default TracksItem;