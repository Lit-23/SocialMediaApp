import { Tooltip, Fab, Box, Modal, Typography, Avatar, styled, TextField, Stack, IconButton, Button } from '@mui/material';
import { Add, Gif, Image, InsertEmoticon, LocationOn, MoreHoriz } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../../firebase/firebaseConfig.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addPostStart,
  addPostFailure,
  addPostSuccess,
} from '../../redux/postSlice/postSlice.js'
import Swal from 'sweetalert2';

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

const AddPost = ({ searchCollection, open, setOpen, formData, setFormData }) => {
  const handleClose = () => {
    setOpen(false);
    setFormData({});
    setThumbnail(); 
    setThumbnailPercent(0);
  };

  // functionality for adding post
  const { currentUser } = useSelector(state => state.user);
  const { postLoading } = useSelector(state => state.post)
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailError, setThumbnailError] = useState(false);
  const [thumbnailPercent, setThumbnailPercent] = useState(0);
  const thumbnailRef = useRef();
  const dispatch = useDispatch();
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
        });
      }
    );
  };
  const handlePost = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      dispatch(addPostStart());
      const res = await fetch(`/api/user/add-post/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(addPostFailure());
        return;
      };
      dispatch(addPostSuccess(data));
      handleClose();
      searchCollection();
      setFormData({});
      Swal.fire({
        title: "Good job!",
        text: `Added a new Post!`,
        icon: "success"
      });
    } catch (error) {
      dispatch(addPostFailure(error));
    };
  };

  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box bgcolor={"background.default"} color={"text.primary"} onSubmit={handlePost} component='form' width={400} borderRadius={2} padding={3} gap={5}>
        <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
          Create Post
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
          {
            thumbnail &&
            <Box sx={{width:'100%'}}>
              <img id='thumbnail' src={formData.postThumbnail}/>
            </Box>
          }
          <Button type='submit' variant='contained'>
            POST
          </Button>
        </Stack>
      </Box>
    </StyledModal>
  )
}

export default AddPost