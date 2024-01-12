import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder, MoreVert, Share } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography } from '@mui/material';

const PostCard = ({ user, userAvatar, timestamps, postDescription, postThumbnail }) => {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe" src={userAvatar}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={user}
        subheader={timestamps}
      />
      <CardMedia
        component="img"
        height="350px"
        // sx={{maxHeight:300, width:600, objectFit:'contain'}}
        image={postThumbnail}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="p" color="text.secondary">
          {postDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing >
        <IconButton aria-label="add to favorites">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite color='error'/>} />
        </IconButton>
        <IconButton aria-label="share">
          <Checkbox icon={<BookmarkBorder/>} checkedIcon={<Bookmark sx={{color:['#ffc107']}}/>}/>
        </IconButton>
        <IconButton aria-label="share" sx={{ml:'auto'}}>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard