import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Fragment } from 'react'

const Contacts = () => {
  return (
    <Box>
      <Typography variant='h6' fontWeight={300}>Contacts</Typography>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary="Con Doriano"/>
        </ListItem>
      </List>
    </Box>
  )
}

export default Contacts