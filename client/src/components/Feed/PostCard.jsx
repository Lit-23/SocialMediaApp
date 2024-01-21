import { Bookmark, BookmarkBorder, Delete, Favorite, FavoriteBorder, Gif, Image, InsertEmoticon, LocationOn, ModeEdit, MoreHoriz, MoreVert, Share } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Menu, MenuItem, Modal, Stack, TextField, Typography, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUserByIDStart, searchUserByIDFailure, searchUserByIDSuccess } from '../../redux/userSlice/userSlice.js';
import { deletePostStart, deletePostFailure, deletePostSuccess, updatePostStart, updatePostFailure, updatePostSuccess } from '../../redux/postSlice/postSlice.js';
import Swal from 'sweetalert2';
import { app } from '../../firebase/firebaseConfig.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UserBox = styled(Box)(({theme}) => ({
  display:'flex',
  alignItems:'center',
  gap:10
}));

const StyledModal = styled(Modal)(({theme}) => ({
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
}));

const PostCard = ({ searchPostCollection, postId, userId, user, userAvatar, timestamps, postDescription, postThumbnail }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUserById = async (event) => {
    const id = event.currentTarget.id;
    try {
      if(currentUser._id === userId) {
        navigate('/profile');
        return;
      };
      dispatch(searchUserByIDStart());
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

  // functionality for editing post
  const [openEditPost, setOpenEditPost] = useState(false);
  const [formData, setFormData] = useState({});
  
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailError, setThumbnailError] = useState(false);
  const [thumbnailPercent, setThumbnailPercent] = useState(0);
  const thumbnailRef = useRef();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
  };

  useEffect(() => {
    if(thumbnail) {
      handleUpload();
    }
  }, [thumbnail]);

  const handleUpload = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + thumbnail.name;
    const imageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(imageRef, thumbnail);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setThumbnailPercent(Math.round(progress));
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        setThumbnailError(true);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, postThumbnail: downloadURL })
          console.log(formData.postThumbnail)
        });
      }
    );
  };

  const handleOpenEditPost = () => {
    if(postThumbnail){
      setFormData({...formData, postDescription, postThumbnail});
    } else {
      setFormData({...formData, postDescription });
    };
    setOpenEditPost(true);
    handleClose();
  };
  
  const { postLoading } = useSelector(state => state.post)
  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatePostStart());
      const res = await fetch(`/api/user/update-post/${postId}`, { 
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(updatePostSuccess(data));
      searchPostCollection();
      setOpenEditPost(false);
    } catch (error) {
      dispatch(updatePostFailure(error));
      alert('error update')
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
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{mt:'40px'}}
        >
          <MenuItem onClick={handleOpenEditPost}>
            <Typography fontSize={14}>Edit</Typography>
            <ModeEdit sx={{color:'gray', ml:'auto', width:20}}/>
          </MenuItem>
          <MenuItem onClick={handleDeletePost} sx={{width:120}}>
            <Typography fontSize={14}>Delete</Typography>
            <Delete sx={{color:'gray', ml:'auto', width:20}}/>
          </MenuItem>
        </Menu>
      }

      {/* edit post modal */}
      <StyledModal
        open={openEditPost}
        onClose={()=>setOpenEditPost(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box bgcolor={"background.default"} color={"text.primary"} onSubmit={handleEditPost} component='form' width={400} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Edit Post
          </Typography>
          <Stack spacing={1}>
            <UserBox>
              <Avatar 
                alt="Travis Howard" src={currentUser.profilePicture}
                sx={{ height:30, width:30 }}
              />
              <Typography variant="span" component="h3" fontSize={16} fontWeight={400}>
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </Typography>
            </UserBox>
            <TextField
              id="postDescription"
              multiline
              rows={3}
              placeholder={`Whats on your mind, ${currentUser.firstName}?`}
              variant="standard"
              sx={{width:'100%'}}
              defaultValue={postDescription}
              onChange={handleChange}
            />
            <input
              type='file'
              hidden
              ref={thumbnailRef}
              accept="image/*"
              onChange={e=>setThumbnail(e.target.files[0])}
            />
            <Stack direction='row' justifyContent='end'>
              <IconButton onClick={() => thumbnailRef.current.click()}>
                <Image color='success'/>
              </IconButton>
              <IconButton>
                <InsertEmoticon sx={{color:['#ff9800']}}/>
              </IconButton>
              <IconButton>
                <LocationOn color='error'/>
              </IconButton>
              <IconButton>
                <Gif color='primary'/>
              </IconButton>
              <IconButton>
                <MoreHoriz sx={{color:['#616161']}}/>
              </IconButton>
            </Stack>
            <Typography component='p' textAlign='center'>
              {
                thumbnailError 
                  ? <Typography component='span' color='error'>Error uploading image(file size must be less than 2MB)</Typography> 
                  : thumbnailPercent > 0 && thumbnailPercent < 100 
                    ? <Typography component='span' color='success'>
                      {`Uploading: ${thumbnailPercent}%`}
                    </Typography>
                    : thumbnailPercent === 100 && ''
              }
            </Typography>
            <Box sx={{width:'100%'}}>
              <img id='thumbnail' src={formData.postThumbnail || postThumbnail}/>
            </Box>
            <Button type='submit' variant='contained'>
              { postLoading ? 'LOADING...' : 'SAVE' }
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default PostCard