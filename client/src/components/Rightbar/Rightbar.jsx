import { Box, Divider, Stack } from '@mui/material';
import ActiveFriends from './ActiveFriends';
import Contacts from './Contacts';

const Rightbar = () => {
  return (
    <Box flex='1' display={{xs:'none', md:'block'}}>
      <Box position='fixed'>
        <Stack spacing={2}>
          <ActiveFriends/>
          <Divider/>
          <Contacts/>
        </Stack>
      </Box>
    </Box>
  )
}

export default Rightbar