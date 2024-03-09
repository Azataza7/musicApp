import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import LogOutModal from '../../Modals/LogOutModal';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { logOutUser } from '../../../features/users/usersThunks';
import { User } from '../../../types';


const UserMenu = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logOutUser(user.token));
    return navigate('/');
  };

  return (
    <>
      <LogOutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onLogout={logOutHandler}
      />
      <Button color="inherit" onClick={handleClick}>
        <Avatar src="/broken-image.jpg" sx={{marginX: 2}}/>
        {user.username}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem>
          <Link to='/track_history' style={{textDecoration: 'none'}}>Music History</Link><QueueMusicIcon/>
        </MenuItem>
        <MenuItem><Link to="/add-artist" style={{textDecoration: 'none', color: '#000'}}>Add Artist</Link> </MenuItem>
        <MenuItem><Link to="/add-album" style={{textDecoration: 'none', color: '#000'}}>Add Album</Link> </MenuItem>

        <MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;