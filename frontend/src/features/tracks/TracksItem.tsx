import React from 'react';
import { Track } from '../../types';
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

interface Props {
  track: Track;
}

const TracksItem: React.FC<Props> = ({track}) => {

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
                <PlayCircleFilledWhiteIcon fontSize="large" color="success" cursor="pointer"/>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

    </Grid>
  );
};

export default TracksItem;