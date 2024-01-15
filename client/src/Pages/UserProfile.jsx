import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, IconButton, Input, InputLabel, Modal, Stack, TextField, Typography, styled } from '@mui/material';
import { Add, Favorite, Gif, Home, Image, InsertEmoticon, LocationOn, ModeEdit, MoreHoriz, People, Place, School, Send, Work } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PostCard from '../components/Feed/PostCard.jsx';

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
  display: 'flex',
  justifyContent:'center'
});

const StyledModal = styled(Modal)({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
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

function UserProfile() {
  const { otherUser } = useSelector(state => state.user);
  const { postList } = useSelector(state => state.post);
  const [isFriend, setIsFriend] = useState(false);
  const handleFriend = () => {
    setIsFriend(prev => !prev);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
              sx={{borderRadius:2, mb:2, maxHeight:400}}
              image={otherUser.coverPhoto}
              alt="Cover Photo"
            />
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar
                alt="profile" 
                src={otherUser.profilePicture}
                sx={{height:120, width:120}}
              />
              <Typography variant='h6' fontWeight={300}>
                {`${otherUser.firstName} ${otherUser.lastName}`}
              </Typography>
            </Stack>
            <Box display='flex' gap={1} justifyContent='end'>
              <Button 
                variant='contained' 
                startIcon={isFriend ? <People/> : <Add/>} 
                onClick={handleFriend}
                sx={isFriend && {opacity:0.8}}
              >
                <Typography fontSize={12}>
                { isFriend ? 'Friend' : 'Add Friend' }
                </Typography>
              </Button>
              <Button variant='outlined' startIcon={<ModeEdit/>} onClick={handleOpen}>
                <Typography fontSize={12}>
                  Message
                </Typography>
              </Button>
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
                otherUser.bio &&
                <>
                  <Typography variant='p' textAlign='center'>{otherUser.bio}</Typography>
                  <Divider/>
                </>
              }
              {
                otherUser.work && otherUser.designation
                  ? <StyledStack>
                      <Work sx={{color:'gray'}}/>
                      <Typography variant='p'>
                        Works as {otherUser.designation} at {otherUser.work}</Typography>
                    </StyledStack>
                  : otherUser.work 
                    ? <StyledStack>
                        <Work sx={{color:'gray'}}/>
                        <Typography variant='p'>
                          Works at {otherUser.work}
                        </Typography>
                      </StyledStack>
                    : otherUser.designation 
                      ? <StyledStack>
                          <Work sx={{color:'gray'}}/>
                          <Typography variant='p'>
                            Works as {otherUser.designation}
                          </Typography>
                        </StyledStack>
                      : ''
              }
              {
                otherUser.primarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {otherUser.primarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                otherUser.secondarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {otherUser.secondarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                otherUser.thirtiarySchool &&
                <StyledStack>
                  <School sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Studied at {otherUser.thirtiarySchool}
                  </Typography>
                </StyledStack>
              }
              {
                otherUser.currentAddress &&
                <StyledStack>
                  <Home sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    Lives in {otherUser.currentAddress}
                  </Typography>
                </StyledStack>
              }
              {
                otherUser.homeAddress &&
                <StyledStack>
                  <Place sx={{color:'gray'}}/>
                  <Typography variant='p'>
                    From {otherUser.homeAddress}
                  </Typography>
                </StyledStack>
              }
              {
                otherUser.status &&
                <StyledStack>
                  <Favorite sx={{color:'gray'}}/>
                  <Typography variant='p'>{otherUser.status}</Typography>
                </StyledStack>
              }

              {
                !otherUser.bio && !otherUser.work && !otherUser.primarySchool && !otherUser.secondarySchool && !otherUser.thirtiarySchool && !otherUser.currentAddress && !otherUser.homeAddress && !otherUser.status &&
                <Typography variant='p' textAlign='center'>This person is Lazy!</Typography>
              }
            </Stack>
          </CardContent>
        </ProfileDetailsCard>
        {/* Profile Details End */}

        {/* Feed Start */}
        <ProfileFeed>
          <Stack spacing={3} marginBottom={10}>
            {
              postList &&
              postList.map((post, index) => {
                const date = post.createdAt.slice(0, 10);
                if(post.id === otherUser._id) {
                  return  (
                    <PostCard key={index} id={post.id} user={post.user} userAvatar={post.userAvatar} timestamps={date} postDescription={post.postDescription} postThumbnail={post.postThumbnail}/>
                  )
                }
              })
            }
          </Stack>
        </ProfileFeed>
        {/* Feed End */}
      </Box>

      {/* Modal */}
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box bgcolor='white' width={400} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            Message
          </Typography>
          <Stack spacing={2}>
            <UserBox>
              <Avatar 
                alt="Travis Howard" src={otherUser.profilePicture}
                sx={{ height:30, width:30 }}
              />
              <Typography variant="span" component="h3" fontSize={16} fontWeight={400}>
                {`${otherUser.firstName} ${otherUser.lastName}`}
              </Typography>
            </UserBox>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder={`Type your message to ${otherUser.firstName}...`}
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
            <Button endIcon={<Send/>} type='submit' variant='contained' onClick={handleClose}>
              SEND
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default UserProfile