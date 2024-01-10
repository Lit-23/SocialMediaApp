import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Modal, Stack, TextField, Typography, styled } from '@mui/material';
import { Add, Gif, Home, Image, InsertEmoticon, LocationOn, ModeEdit, MoreHoriz, Place, School, Work } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Feed from '../components/Feed/Feed';
import { useState } from 'react';
import Swal from "sweetalert2";
import { app } from "../firebase/firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserStart, updateUserFailure, updateUserSuccess, signinFailure } from '../redux/userSlice/userSlice.js';

const AvatarCard = styled(Card)({
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const ProfileDetailsCard = styled(Card)({
  padding:5,
  marginTop:20,
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const StyledStack = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap:15
});

const ProfileFeed = styled(Box)({
  marginTop:20,
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const StyledModal = styled(Modal)({
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
});

const UserBox = styled(Box)({
  display:'flex',
  alignItems:'center',
  gap:10
});

const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  marginLeft:'auto',
  marginRight:'auto'
});

function Profile() {
  const { currentUser, loading } = useSelector(state => state.user);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditDetails, setOpenEditDetails] = useState(false);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const [editingBio, setEditingBio] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  };
  const handleUpload = async () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenEditDetails(false);
    try {
      dispatch(updateUserStart());
      if(loading){
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // user update failure
      if(data.success === false){
        dispatch(signinFailure(data));
        alert('somethin went wrong');
        return;
      };

      // user update success
      dispatch(updateUserSuccess(data));
      setEditingBio(false);
      Swal.fire({
        title: "Good job!",
        text: `Successfully updated your background!`,
        icon: "success"
      });
    } catch (error) {
      dispatch(updateUserFailure(error));
      alert('somethin went wrong');
    }
  };
  return (
    <>
      <Box>

        {/* Avatar Section Start */}
        <AvatarCard>
          <CardContent>
            <CardMedia
              component="img"
              height="20%"
              sx={{borderRadius:2}}
              image={currentUser.coverPhoto}
              alt="Cover Photo"
            />
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar
                alt="profile" 
                src={currentUser.profilePicture}
                sx={{height:120, width:120}}
              />
              <Typography variant='h6' fontWeight={300}>
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </Typography>
            </Stack>
            <Box display='flex' gap={1} justifyContent='end'>
              <Button variant='contained' startIcon={<Add/>} onClick={()=>setOpenAddPost(true)}>Add Post</Button>
              <Button variant='outlined' startIcon={<ModeEdit/>} onClick={()=>setOpenEditProfile(true)}>Edit Profile</Button>
            </Box>
          </CardContent>
        </AvatarCard>
        {/* Avatar Section End */}

        {/* Profile Details Start */}
        <ProfileDetailsCard>
          <CardContent>
            <Typography variant='h6' fontWeight={300} marginBottom={1}>Background</Typography>

            <Stack spacing={1}>
              {
                currentUser.bio && !editingBio &&
                <>
                  <Typography variant='p' textAlign='center'>{currentUser.bio}</Typography>
                  <Button variant='outlined' onClick={()=>{setEditingBio(true)}}>Edit bio</Button>
                </>
              }
              {
                editingBio &&
                <>
                  <TextField
                    id="bio"
                    multiline
                    rows={3}
                    defaultValue={currentUser.bio}
                    onChange={handleChange}
                  />
                  <Box onSubmit={handleSubmit} component='form' display='flex' gap={1} justifyContent='end'>
                    <Button variant='outlined' size='small' onClick={()=>{setEditingBio(false)}}>Cancel</Button>
                    <Button type='submit' variant='contained' size='small'>Save</Button>
                  </Box>
                </>
              }
              {
                currentUser.work && currentUser.designation
                  ? <StyledStack>
                      <Work sx={{color:'gray'}}/>
                      <Typography variant='p'>
                        Works as {formData.designation} at {currentUser.work}</Typography>
                    </StyledStack>
                  : currentUser.work 
                    ? <StyledStack>
                        <Work sx={{color:'gray'}}/>
                        <Typography variant='p'>
                          Works at {currentUser.work}
                        </Typography>
                      </StyledStack>
                    : currentUser.designation 
                      ? <StyledStack>
                          <Work sx={{color:'gray'}}/>
                          <Typography variant='p'>
                            Works as {currentUser.designation}
                          </Typography>
                        </StyledStack>
                      : ''
              }
              {
                currentUser.primarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {currentUser.primarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                currentUser.secondarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {currentUser.secondarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                currentUser.thirtiarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {currentUser.thirtiarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                currentUser.currentAddress &&
                <StyledStack>
                  <Home sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Lives in {currentUser.currentAddress}
                  </Typography>
                </StyledStack>
              }
              {
                currentUser.status &&
                <StyledStack>
                  <Place sx={{color:'gray'}}/>
                  <Typography variant='p'>{currentUser.status}</Typography>
                </StyledStack>
              }
              {
                currentUser.homeAddress &&
                <StyledStack>
                  <Place sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    From {currentUser.homeAddress}
                  </Typography>
                </StyledStack>
              }
            </Stack>
            
          <Button variant='contained' sx={{width:'100%', mt:2}} onClick={()=>setOpenEditDetails(true)}>Edit details</Button>
          </CardContent>
        </ProfileDetailsCard>
        {/* Profile Details End */}

        {/* Feed Start */}
        <ProfileFeed>
          <Feed/>
        </ProfileFeed>
        {/* Feed End */}
      </Box>

      {/* Edit Profile Modal */}
      <StyledModal
        open={openEditProfile}
        onClose={()=>setOpenEditProfile(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component='form' bgcolor='white' width={600} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Edit Profile
          </Typography>
          <Divider/>
          <Box mt={2}>
            <Stack direction='row' spacing='auto'>
              <Typography variant='h6' fontWeight={300}>Profile Picture</Typography>
              <Button>Edit</Button>
            </Stack>
            <StyledAvatar alt={currentUser.lastName} src={currentUser.profilePicture}/>
          </Box>
          <Box mt={2}>
            <Stack direction='row' spacing='auto'>
              <Typography variant='h6' fontWeight={300}>Cover Photo</Typography>
              <Button>Edit</Button>
            </Stack>
            <Box sx={{width:'100%'}}>
              <img id='cover-photo' alt='cover photo' src={currentUser.coverPhoto}/>
            </Box>
          </Box>
          <Stack spacing={2} mt={2}>
            <Button type='submit' variant='contained'>
              submit
            </Button>
          </Stack>
        </Box>
      </StyledModal>

      {/* Edit Details Modal */}
      <StyledModal
        open={openEditDetails}
        onClose={()=>setOpenEditDetails(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box onSubmit={handleSubmit} component='form' bgcolor='white' width={600} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Edit Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              id="bio"
              multiline
              label='Add bio'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.bio || formData.bio}
              onChange={handleChange}
            />
            <TextField
              id="work"
              multiline
              label='Add a workplace'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.work || formData.work}
              onChange={handleChange}
            />
            <TextField
              id="designation"
              multiline
              label='Add your designation'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.designation || formData.designation}
              onChange={handleChange}
            />
            <TextField
              id="primarySchool"
              multiline
              label='Add elementary school'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.primarySchool || formData.primarySchool}
              onChange={handleChange}
            />
            <TextField
              id="secondarySchool"
              multiline
              label='Add high school'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.secondarySchool || formData.secondarySchool}
              onChange={handleChange}
            />
            <TextField
              id="thirtiarySchool"
              multiline
              label='Add college'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.thirtiarySchool || formData.thirtiarySchool}
              onChange={handleChange}
            />
            <TextField
              id="currentAddress"
              multiline
              label='Add current address'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.currentAddress || formData.currentAddress}
              onChange={handleChange}
            />
            <TextField
              id="homeAddress"
              multiline
              label='Add home address'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.homeAddress || formData.homeAddress}
              onChange={handleChange}
            />
            <TextField
              id="status"
              multiline
              label='Add a relationship status'
              variant="outlined"
              sx={{width:'100%'}}
              defaultValue={currentUser.status || formData.status}
              onChange={handleChange}
            />
            <Button type='submit' variant='contained' sx={{py:['12px']}}>
              submit
            </Button>
          </Stack>
        </Box>
      </StyledModal>

      {/* Add Post Modal */}
      <StyledModal
        open={openAddPost}
        onClose={()=>setOpenAddPost(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component='form' bgcolor='white' width={400} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Create Post
          </Typography>
          <Stack spacing={2}>
            <UserBox>
              <Avatar 
                alt={currentUser.lastName} src={currentUser.profilePicture}
                sx={{ height:30, width:30 }}
              />
              <Typography variant="span" component="h3" fontSize={16} fontWeight={400}>
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </Typography>
            </UserBox>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder={`Whats on your mind, ${currentUser.firstName}?`}
              variant="standard"
              sx={{width:'100%'}}
            />
            <Stack direction='row' justifyContent='end'>
              <IconButton>
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
            <Button type='submit' variant='contained'>
              POST
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default Profile