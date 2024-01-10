import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Modal, Stack, TextField, Typography, styled } from '@mui/material';
import { Add, Gif, Image, InsertEmoticon, LocationOn, ModeEdit, MoreHoriz, Place, School, Work } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Feed from '../components/Feed/Feed';
import { useState } from 'react';
import Swal from "sweetalert2";

// imports for firebase storage
import { app } from "../firebase/firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AvatarCard = styled(Card)({
  maxWidth: 800,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const ProfileDetailsCard = styled(Card)({
  padding:10,
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
  const { currentUser } = useSelector(state => state.user);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditDetails, setOpenEditDetails] = useState(false);
  const [openAddPost, setOpenAddPost] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  };
  const handleUpload = async () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
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
              <StyledStack>
                <Work sx={{color:'gray'}}/>
                <Typography variant='p'>
                  Studied at Batangas State Universirty
                </Typography>
              </StyledStack>
              <StyledStack>
                <School sx={{color:'gray'}}/>
                <Typography variant='p'>
                  Studied at Batangas State Universirty
                </Typography>
              </StyledStack>
              <StyledStack>
                <Place sx={{color:'gray'}}/>
                <Typography variant='p'>
                  Lives in Lipa, Batangas
                </Typography>
              </StyledStack>
            </Stack>
            
          </CardContent>

          <CardActions>
            <Button variant='contained' sx={{width:'100%'}} onClick={()=>setOpenEditDetails(true)}>Edit details</Button>
          </CardActions>
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
        <Box component='form' bgcolor='white' width={600} borderRadius={2} padding={3} gap={5}>
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
            />
            <TextField
              id="work"
              multiline
              label='Add a workplace'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="primarySchool"
              multiline
              label='Add elementary school'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="secondarySchool"
              multiline
              label='Add high school'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="thirtiarySchool"
              multiline
              label='Add college'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="homeAddress"
              multiline
              label='Add home address'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="currentAddress"
              multiline
              label='Add current address'
              variant="outlined"
              sx={{width:'100%'}}
            />
            <TextField
              id="status"
              multiline
              label='Add a relationship status'
              variant="outlined"
              sx={{width:'100%'}}
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