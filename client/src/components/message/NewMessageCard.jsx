import { Tooltip, Fab, Box, Modal, Typography, Avatar, styled, TextField, Stack, IconButton, Button, Input, InputLabel } from '@mui/material';
import { Gif, Image, InsertEmoticon, LocationOn, MapsUgc, MoreHoriz, Send } from '@mui/icons-material';
import { useState } from 'react';

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

const NewMessageCard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {/* Tooltip */}
      <Box position='fixed' bottom={20} right={20} display={{xs:'none', md:'block'}}>
        <Tooltip title="Add New Post">
          <Fab color="gray" onClick={handleOpen}>
            <MapsUgc />
          </Fab>
        </Tooltip>
      </Box>
      
      {/* Modal */}
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component='form' bgcolor='white' width={400} borderRadius={2} padding={3} gap={5}>
          <Typography variant="h6" component="h2" color='gray' fontWeight={400} textAlign='center' mb={1}>
            New Message
          </Typography>
          <Stack spacing={2}>
            <UserBox>
              <InputLabel htmlFor='send-to'>To:</InputLabel>
              <Input id='send-to' sx={{width:'90%'}}/>
              {/* <Avatar 
                alt="Travis Howard" src="/static/images/avatar/2.jpg"
                sx={{ height:30, width:30 }}
              />
              <Typography variant="span" component="h3" fontSize={16} fontWeight={400}>
                Con Doriano
              </Typography> */}
            </UserBox>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={3}
              placeholder='Type your message here...'
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
            <Button endIcon={<Send/>} type='submit' variant='contained'>
              SEND
            </Button>
          </Stack>
        </Box>
      </StyledModal>
    </>
  )
}

export default NewMessageCard