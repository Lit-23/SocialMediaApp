import { Bookmark, BookmarkBorder, Delete, Favorite, FavoriteBorder, MoreVert, Search, Share } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUserByIDStart, searchUserByIDFailure, searchUserByIDSuccess } from '../../redux/userSlice/userSlice.js';
import { deletePostStart, deletePostFailure, deletePostSuccess } from '../../redux/postSlice/postSlice.js';
import Swal from 'sweetalert2';

const PostCard = ({ searchPostCollection, postId, userId, user, userAvatar, timestamps, postDescription, postThumbnail }) => {
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
      const res = await fetch(`/api/user/search-user/${userId}`, { method: 'GET' });
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
  
  // functionality for deleting post
  const handleDeletePost = async () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        dispatch(deletePostStart());
        const res = await fetch(`/api/user/delete/${postId}`, { method: 'DELETE' });
        const data = await res.json();
        if(res.success === false) {
          dispatch(deletePostFailure(data)); 
          return;
        }
        dispatch(deletePostSuccess());
        searchPostCollection();
      }
    });
  };
  return (
    <>
      <Card sx={{ maxWidth: 600, minWidth:300 }}>
        <CardHeader
          avatar={
            <Avatar id={userId} onClick={searchUserById} sx={{cursor:'pointer'}} aria-label="recipe" src={userAvatar}/>
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
      {
        currentUser._id === userId &&
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleDeletePost}>
            <Stack spacing={2} direction='row'>
              <Typography>Delete</Typography>
              <Delete sx={{color:'gray', ml:'auto'}}/>
            </Stack>
          </MenuItem>
        </Menu>
      }
    </>
  )
}

export default PostCard