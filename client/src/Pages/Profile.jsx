import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Modal, Stack, TextField, Typography, styled } from '@mui/material';
import { Add, Favorite, Home, ModeEdit, Place, School, Work } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Swal from "sweetalert2";
import { app } from "../firebase/firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserStart, updateUserFailure, updateUserSuccess, signinFailure } from '../redux/userSlice/userSlice.js';
import { getPostListStart, getPostListFailure, getPostListSuccess } from '../redux/postSlice/postSlice.js';
import PostCard from '../components/Feed/PostCard.jsx';
import AddPost from '../components/Feed/AddPost.jsx';

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
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom:20
});

const StyledModal = styled(Modal)({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
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
  const [formData, setFormData] = useState({});

  const [coverPhoto, setCoverPhoto] = useState();
  const [coverPhotoError, setCoverPhotoError] = useState(false);
  const [coverPhotoPercent, setCoverPhotoPercent] = useState(0);
  
  const [profilePicture, setProfilePicture] = useState();
  const [profileError, setProfileError] = useState(false);
  const [profilePercent, setProfilePercent] = useState(0);

  const [editingBio, setEditingBio] = useState(false);
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const coverRef = useRef(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  };

  useEffect(() => {
    if(profilePicture) {
      handleUpload(profilePicture, 'profilePicture', setProfileError, setProfilePercent);
    }
    if(coverPhoto) {
      handleUpload(coverPhoto, 'coverPhoto', setCoverPhotoError, setCoverPhotoPercent);
    }
  }, [profilePicture, coverPhoto]);

  const handleUpload = async (img, formdataName, setError, setImagePercent) => {
    setProfileError(false);
    setCoverPhotoError(false);
    const storage = getStorage(app);
    const filename = new Date().getTime() + img.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      }, 
      (error) => {
        // handle upload error
        setError(true);
      }, 
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, [formdataName]: downloadURL });
        });
        setError(false);
      }
    );
  };

  // add post functionality
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postFormData, setPostFormData] = useState({});
  const handleOpenPostModal = () => {
    setOpenPostModal(true);
    setPostFormData({
      ...postFormData, 
      id: currentUser._id, 
      user: `${currentUser.firstName} ${currentUser.lastName}`, 
      userAvatar: currentUser.profilePicture,
    });
  };

  // functionality for fetching posts collection
  const [postCollection, setPostCollection] = useState([]);
  const { postLoading } = useSelector(state => state.post);
  const searchPostCollection = async () => {
    try {
      dispatch(getPostListStart());
      if(postLoading === true) {
        Swal.showLoading();
      } else {
        Swal.close();
      };
      const res = await fetch('/api/user/post-list', { method: 'GET' });
      const data = await res.json();
      dispatch(getPostListSuccess(data));
      setPostCollection(data);
    } catch (error) {
      dispatch(getPostListFailure(error));
      console.log('error fetching!');
    }
  };
  useEffect(() => {
    searchPostCollection();
    Swal.showLoading();
    setTimeout(()=>Swal.close(), 500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenEditDetails(false);
    try {
      dispatch(updateUserStart());
      if(loading){
        Swal.showLoading();
      } else {
        Swal.close();
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
        Swal.fire({
          title: "Ooops!",
          text: `Something went wrong!`,
          icon: "error"
        });
        return;
      };

      // user update success
      dispatch(updateUserSuccess(data));
      setEditingBio(false);
      setOpenEditProfile(false);
      setOpenEditDetails(false);
      setProfilePercent(0); 
      setCoverPhotoPercent(0);
    } catch (error) {
      dispatch(updateUserFailure(error));
      Swal.fire({
        title: "Ooops!",
        text: `Something went wrong!`,
        icon: "error"
      });
    }
  };
  
  useEffect(() => {
    // This will scroll the page to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box>

        {/* Avatar Section Start */}
        <AvatarCard>
          <CardContent>
            <CardMedia
              component="img"
              height="20%"
              sx={{borderRadius:2, mb:2, maxHeight:400}}
              image={currentUser.coverPhoto}
              alt="Cover Photo"
            />
            <Stack direction='row' alignItems='center' spacing={2} sx={{marginBottom:{xs:1, sm:0}}}>
              <Avatar
                alt="profile" 
                src={currentUser.profilePicture}
                sx={{height:{xs: 80,md:120}, width:{xs: 80,md:120}}}
              />
              <Typography variant='h6' fontWeight={300}>
                {`${currentUser.firstName} ${currentUser.lastName}`}
              </Typography>
            </Stack>
            <Box display='flex' gap={1} justifyContent='end'>
              <Button variant='contained' startIcon={<Add/>} onClick={handleOpenPostModal}>
                <Typography fontSize={12}>
                  Add Post
                </Typography>
              </Button>
              <Button variant='outlined' startIcon={<ModeEdit/>} onClick={()=>setOpenEditProfile(true)}>
                <Typography fontSize={12}>
                  Edit Profile
                </Typography>
              </Button>
            </Box>
          </CardContent>
        </AvatarCard>
        {/* Avatar Section End */}

        {/* Profile Details Start */}
        <ProfileDetailsCard>
          <CardContent>
            <Typography variant='h6' fontWeight={400} marginBottom={1}>Background</Typography>

            <Stack spacing={1}>
              {
                currentUser.bio && !editingBio &&
                <>
                  <Typography variant='p' textAlign='center' fontSize={15}>{currentUser.bio}</Typography>
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
                    <Button variant='outlined' size='small' onClick={()=>{setEditingBio(false); setFormData({});}}>Cancel</Button>
                    <Button type='submit' variant='contained' size='small'>Save</Button>
                  </Box>
                </>
              }
              {
                currentUser.work && currentUser.designation
                  ? <StyledStack>
                      <Work sx={{color:'gray'}}/>
                      <Typography variant='p'>
                        Works as {currentUser.designation} at {currentUser.work}</Typography>
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
                currentUser.homeAddress &&
                <StyledStack>
                  <Place sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    From {currentUser.homeAddress}
                  </Typography>
                </StyledStack>
              }
              {
                currentUser.status &&
                <StyledStack>
                  <Favorite sx={{color:'gray'}}/>
                  <Typography variant='p'>{currentUser.status}</Typography>
                </StyledStack>
              }
            </Stack>
            
          <Button variant='contained' sx={{width:'100%', mt:2}} onClick={()=>setOpenEditDetails(true)}>Edit details</Button>
          </CardContent>
        </ProfileDetailsCard>
        {/* Profile Details End */}

        {/* Feed Start */}
        <ProfileFeed>
          <Stack spacing={1}>
            {
              postCollection &&
              [...postCollection].reverse().map((post) => { 
              const date = post.createdAt.slice(0, 10);
              if(post.id === currentUser._id) {
                return  (
                  <PostCard key={post._id} searchPostCollection={searchPostCollection} postId={post._id} userId={post.id} user={post.user} userAvatar={post.userAvatar} timestamps={date} postDescription={post.postDescription} postThumbnail={post.postThumbnail}/>
                )
              }
            })
            }
          </Stack>
        </ProfileFeed>
        {/* Feed End */}
      </Box>

      {/* Edit Profile Modal */}
      <StyledModal
        open={openEditProfile}
        onClose={()=>{setOpenEditProfile(false); setFormData({}); setProfilePercent(0); setCoverPhotoPercent(0); setProfilePicture(); setCoverPhoto(); setProfileError(false); setCoverPhotoError(false);}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box bgcolor={"background.default"} color={"text.primary"} sx={{maxHeight: '95vh', overflow: 'auto'}}  onSubmit={handleSubmit} component='form' width={600} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Edit Profile
          </Typography>
          <Divider/>
          <Box mt={2}>
              <input
                type='file'
                ref={profileRef} 
                hidden 
                accept="image/*"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            <Stack direction='row' spacing='auto'>
              <Typography variant='h6' fontWeight={300}>Profile Picture</Typography>
              <Button id='profilePicture' onClick={() => profileRef.current.click()}>Edit</Button>
            </Stack>
            <StyledAvatar alt={currentUser.lastName} src={formData.profilePicture || currentUser.profilePicture}/>
            <Typography component='p' textAlign='center'>
              {
                profileError 
                  ? <Typography component='span' color='error'>Error uploading image(file size must be less than 2MB)</Typography> 
                  : profilePercent > 0 && profilePercent < 100 
                    ? <Typography component='span' color='success'>
                      {`Uploading: ${profilePercent}%`}
                    </Typography>
                    : profilePercent === 100
                      ? <Typography component='span' sx={{color:['#4BB543']}}>Image uploaded successfully!</Typography>
                      : ''
              }
            </Typography>
          </Box>
          <Box mt={2}>
              <input
                type='file'
                ref={coverRef} 
                hidden 
                accept="image/*"
                onChange={(e) => setCoverPhoto(e.target.files[0])}
              />
            <Stack direction='row' spacing='auto'>
              <Typography variant='h6' fontWeight={300}>Cover Photo</Typography>
              <Button onClick={() => coverRef.current.click()}>Edit</Button>
            </Stack>
            <Box sx={{width:'100%'}}>
              <img id='cover-photo' alt='cover photo' src={formData.coverPhoto || currentUser.coverPhoto}/>
            </Box>
            <Typography component='p' textAlign='center'>
              {
                coverPhotoError 
                  ? <Typography component='span' color='error'>Error uploading image(file size must be less than 2MB)</Typography> 
                  : coverPhotoPercent > 0 && coverPhotoPercent < 100 
                    ? <Typography component='span' color='success'>
                      {`Uploading: ${coverPhotoPercent}%`}
                    </Typography>
                    : coverPhotoPercent === 100
                      ? <Typography component='span' sx={{color:['#4BB543']}}>Image uploaded successfully!</Typography>
                      : ''
              }
            </Typography>
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
        onClose={()=>{setOpenEditDetails(false); setFormData({});}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box bgcolor={"background.default"} color={"text.primary"} sx={{maxHeight: '95vh', overflow: 'auto'}} onSubmit={handleSubmit} component='form' width={600} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Edit Details
          </Typography>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography fontWeight={500} color='gray'>Bio</Typography>
              <TextField
                id="bio"
                multiline
                label='Add bio'
                variant="outlined"
                sx={{width:'100%'}}
                defaultValue={currentUser.bio || formData.bio}
                onChange={handleChange}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={500} color='gray'>Work</Typography>
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
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={500} color='gray'>Education</Typography>
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
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={500} color='gray'>Address</Typography>
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
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={500} color='gray'>Relationship Status</Typography>
              <TextField
                id="status"
                multiline
                label='Add a relationship status'
                variant="outlined"
                sx={{width:'100%'}}
                defaultValue={currentUser.status || formData.status}
                onChange={handleChange}
              />
            </Stack>
            <Button type='submit' variant='contained' sx={{py:['12px']}}>
              submit
            </Button>
          </Stack>
        </Box>
      </StyledModal>

      {/* Add Post Modal */}
      <AddPost searchCollection={searchPostCollection} open={openPostModal} setOpen={setOpenPostModal} formData={postFormData} setFormData={setPostFormData}/>
    </>
  )
}

export default Profile