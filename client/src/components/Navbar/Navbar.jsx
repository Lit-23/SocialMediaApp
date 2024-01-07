import { AppBar, Box, styled, Menu, IconButton, Toolbar, Tooltip, Typography, Badge, Avatar, MenuItem } from '@mui/material';
import { Adb, Mail, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessagesCard from '../message/MessagesCard';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  display:"flex",
  justifyContent:"space-between"
}))

const Icons = styled(Box)(({theme})=>({
  display:"none",
  alignItems:"center",
  gap:5,
  [theme.breakpoints.up("sm")]:{
    display: "flex"
  }
}));

const StyledTypography = styled(Typography)(({theme}) => ({
  transition: 'text-decoration 0.3s ease',
  "&:hover":{
    cursor:"pointer",
    textDecoration: 'underline',
    opacity: 0.8,
  }
}))

const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(true);

  // state for MessagesCard modal
  const [openModal, setOpenModal] = useState(false);

  // state for notifications menu
  const [openNotificationsMenu, setOpenNotificationsMenu] = useState(false);
  const handleOpenNotifications = () => {
    setOpenNotificationsMenu(true);
  };
  const handleCloseNotifications = () => {
    setOpenNotificationsMenu(false);
  };

  // state & functionality for avatarMenu
  const [openAvatarMenu, setOpenAvatarMenu] = useState(false);
  const handleOpenAvatar = () => {
    setOpenAvatarMenu(true);
  };
  const handleCloseAvatar = () => {
    setOpenAvatarMenu(false);
  };

  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography 
          onClick={()=>navigate('/')}
          variant="h6" 
          sx={{
            "&:hover":{
              cursor:"pointer", 
              opacity:0.8
            },
            display:{
              xs:"none",
              sm:"block"
            }
          }} 
        >
          LitFlix
        </Typography>
        <Adb 
          onClick={()=>navigate('/')}
          sx={{
            "&:hover":{
              cursor:"pointer", 
              opacity:0.8
            },
            display:{
              xs:"block",
              sm:"none"
            }
          }} 
        />
        {
          authenticated
            ? <Box>
                <Icons>
                  <Tooltip title="Messages">
                    <IconButton onClick={e=>setOpenModal(true)}>
                      <Badge badgeContent={3} color="error">
                        <Mail sx={{color:["white"]}}/>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Notifications">
                    <IconButton onClick={handleOpenNotifications}>
                      <Badge badgeContent={4} color="error">
                        <Notifications sx={{color:["white"]}}/>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpenAvatar}>
                      <Avatar sx={{height:30, width:30}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                  </Tooltip>
                </Icons>
                <Box sx={{ display:{xs:"block", sm:"none"} }}>
                  <MenuIcon/>
                </Box>
              </Box>
            : <Box sx={{ display:"flex", gap:1 }}>
                <StyledTypography onClick={()=>navigate('/register')}>
                  Register
                </StyledTypography>
                <StyledTypography onClick={()=>navigate('/')}>
                  Signin
                </StyledTypography>
              </Box>
        }
      </StyledToolbar>

      {/* MessagesCard Modal */}
      <MessagesCard open={openModal} setOpen={setOpenModal}/>

      {/* Notifications menu */}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openNotificationsMenu}
        onClose={(handleCloseNotifications)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{mt:"35px"}}
      >
        <MenuItem onClick={handleCloseAvatar}>You have unread messages...</MenuItem>
        <MenuItem onClick={handleCloseAvatar}>New friend suggestion!</MenuItem>
        <MenuItem onClick={handleCloseAvatar}>New Message.</MenuItem>
        <MenuItem onClick={handleCloseAvatar}>Your friend liked your post.</MenuItem>
      </Menu>

      {/* Avatar menu */}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={openAvatarMenu}
        onClose={(handleCloseAvatar)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{mt:"35px", right:"50px"}}
      >
        <MenuItem onClick={handleCloseAvatar}>Profile</MenuItem>
        <MenuItem onClick={handleCloseAvatar}>My account</MenuItem>
        <MenuItem onClick={handleCloseAvatar}>Logout</MenuItem>
      </Menu>

    </AppBar>
  )
}

export default NavBar