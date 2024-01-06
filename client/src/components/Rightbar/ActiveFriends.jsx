import { Avatar, AvatarGroup, Box, Typography } from '@mui/material'

const ActiveFriends = () => {
  return (
    <Box>
      <Typography variant='h6' fontWeight={300}>Active Friends</Typography>
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>
    </Box>
  )
}

export default ActiveFriends