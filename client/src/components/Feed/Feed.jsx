import { Box, Stack } from '@mui/material'
import PostCard from './PostCard'

const Feed = () => {
  const user = 'Douglas Mapagmahal';
  const userAvatar = 'https://images.pexels.com/photos/19613756/pexels-photo-19613756/free-photo-of-black-and-white-photography-of-a-monkey.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  const timestamps = 'May 2, 2023';
  const postDescription = 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.';
  const postThumbnail = 'https://images.pexels.com/photos/16743486/pexels-photo-16743486/free-photo-of-seafood-paella-with-lobster.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <Box flex='4' display='flex' justifyContent='center'>
      <Stack display='block' spacing={3}>
        <PostCard user={user} userAvatar={userAvatar} timestamps={timestamps} postDescription={postDescription} postThumbnail={postThumbnail}/>
      </Stack>
    </Box>
  )
}

export default Feed