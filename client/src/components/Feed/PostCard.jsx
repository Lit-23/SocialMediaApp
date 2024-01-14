import { Bookmark, BookmarkBorder, Delete, Favorite, FavoriteBorder, MoreVert, Search, Share } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUserByIDStart, searchUserByIDFailure, searchUserByIDSuccess } from '../../redux/userSlice/userSlice.js';
import Swal from 'sweetalert2';

const PostCard = ({ id, user, userAvatar, timestamps, postDescription, postThumbnail }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUserById = async (event) => {
    const id = event.currentTarget.id;
    try {
      dispatch(searchUserByIDStart());
      if(loading){
        Swal.showLoading()
      } else {
        Swal.hideLoading()
      };
      const res = await fetch(`/api/user/search-user/${id}`, { method: 'GET' });
      const data = await res.json();
      if(data.success===false) {
        dispatch(searchUserByIDFailure(data));
        return;
      };
      dispatch(searchUserByIDSuccess(data));
      navigate('/user-profile')
    } catch (error) {
      dispatch(searchUserByIDFailure(error))
    }
  };
  return (
    <>
      <Card sx={{ maxWidth: 600, minWidth:300 }}>
        <CardHeader
          avatar={
            <Avatar id={id} onClick={searchUserById} sx={{cursor:'pointer'}} aria-label="recipe" src={userAvatar}/>
          }
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          }
          title={user}
          subheader={timestamps}
        />
        {
          postThumbnail &&
          <CardMedia
            component="img"
            height="350px"
            // sx={{maxHeight:300, width:600, objectFit:'contain'}}
            image={postThumbnail}
            alt="Paella dish"
          />
        }
        <CardContent>
          <Typography variant="p" color="text.secondary">
            {postDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing >
          <IconButton aria-label="add to favorites">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color='error'/>} />
          </IconButton>
          <IconButton aria-label="share">
            <Checkbox icon={<BookmarkBorder/>} checkedIcon={<Bookmark sx={{color:['#ffc107']}}/>}/>
          </IconButton>
          <IconButton aria-label="share" sx={{ml:'auto'}}>
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    
      {/* post card menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
          currentUser._id === postDescription.id
            ? <MenuItem onClick={handleClose}>
                <Stack spacing={2} direction='row'>
                  <Typography>Delete</Typography>
                  <Delete sx={{color:'gray', ml:'auto'}}/>
                </Stack>
              </MenuItem>
            : <MenuItem onClick={handleClose}>
                <Stack spacing={2} direction='row'>
                  <Typography>View Profile</Typography>
                  <Search sx={{color:'gray'}}/>
                </Stack>
              </MenuItem>
        }
        
      </Menu>
    </>
  )
}

export default PostCard