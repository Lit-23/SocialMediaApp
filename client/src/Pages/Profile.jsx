import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography, styled } from '@mui/material';
import { Add, ModeEdit, Place, School, Work } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Feed from '../components/Feed/Feed';

const defaultCoverPhoto = 'https://images.pexels.com/photos/696644/pexels-photo-696644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

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

function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <Box>

      {/* Avatar Section Start */}
      <AvatarCard>
        <CardContent>
          <CardMedia
            component="img"
            height="20%"
            sx={{borderRadius:2}}
            image={defaultCoverPhoto}
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
            <Button variant='contained' startIcon={<Add/>}>Add Post</Button>
            <Button variant='outlined' startIcon={<ModeEdit/>}>Edit Profile</Button>
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
          <Button variant='contained' sx={{width:'100%'}}>Edit details</Button>
        </CardActions>
      </ProfileDetailsCard>
      {/* Profile Details End */}

      {/* Feed Start */}
      <ProfileFeed>
        <Feed/>
      </ProfileFeed>
      {/* Feed End */}
    </Box>
  )
}

export default Profile