import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUserByIDFailure, searchUserByIDStart, searchUserByIDSuccess } from '../../redux/userSlice/userSlice';

const Contacts = ({ collection }) => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchUserById = async (event) => {
    const id = event.currentTarget.id;
    try {
      dispatch(searchUserByIDStart());
      const res = await fetch(`/api/user/search-user/${id}`, { method: 'GET' });
      const data = await res.json();
      if(data.success===false) {
        dispatch(searchUserByIDFailure(data));
        return;
      };
      dispatch(searchUserByIDSuccess(data));
      navigate('/user-profile')
    } catch (error) {
      dispatch(searchUserByIDFailure(error))
    }
  };

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
                    <Avatar id={user._id} onClick={searchUserById} sx={{cursor:'pointer'}} alt={user.firstName} src={user.profilePicture} />
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