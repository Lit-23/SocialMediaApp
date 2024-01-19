import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Contacts = ({ collection }) => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <Box>
      <Typography variant='h6' fontWeight={300}>Contacts</Typography>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {
          collection.map((user, index) => {
            if(currentUser._id !== user._id) {
              return (
                <ListItem key={index} alignItems="center">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user.profilePicture} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                </ListItem>
              )
            }
          })
        }
      </List>
    </Box>
  )
}

export default Contacts