import { Box, Divider, Stack } from '@mui/material';
import ActiveFriends from './ActiveFriends';
import Contacts from './Contacts';

const Rightbar = ({ collection }) => {
  return (
    <Box flex='1.3' display={{xs:'none', md:'block'}}>
      <Box position='fixed'>
        <Stack spacing={2}>
          <ActiveFriends/>
          <Divider/>
          {
            collection &&
            <Contacts collection={collection}/>
          }
        </Stack>
      </Box>
    </Box>
  )
}

export default Rightbar