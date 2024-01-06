import { AppBar, Box, styled, Menu, IconButton, Toolbar, Tooltip, Typography, Badge, Avatar, MenuItem } from '@mui/material';
import { Adb, Mail, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

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
  const [authenticated, setAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography 
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
          variant="h6" 
        >
          LitFlix
        </Typography>
        <Adb 
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
                    <IconButton>
                      <Badge badgeContent={2} color="error">
                        <Mail sx={{color:["white"]}}/>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Notifications">
                    <IconButton>
                      <Badge badgeContent={4} color="error">
                        <Notifications sx={{color:["white"]}}/>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Account">
                    <IconButton onClick={handleOpen}>
                      <Avatar sx={{height:30, width:30}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                  </Tooltip>
                </Icons>
                <Box sx={{ display:{xs:"block", sm:"none"} }}>
                  <MenuIcon/>
                </Box>
              </Box>
            : <Box sx={{ display:"flex", gap:1 }}>
                <StyledTypography>Register</StyledTypography>
                <StyledTypography>Login</StyledTypography>
              </Box>
        }
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{mt:"30px"}}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default NavBar