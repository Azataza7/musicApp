import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutUser, selectUser } from '../../../features/users/usersSlice';
import { Link, useNavigate } from 'react-router-dom';
import LogOutModal from '../../Modals/LogOutModal';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';


const UserMenu = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logoutUser());
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
        <MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;