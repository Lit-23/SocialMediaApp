import { Box, Stack } from '@mui/material';
import PostCard from './PostCard';
import moment from 'moment';
import LitflixFeatures from '../litflixFeatures/LitflixFeatures';

const Feed = ({ collection, searchPostCollection }) => {
  return (
    <Box flex='4' display='flex' justifyContent="center">
     <Stack spacing={1} marginBottom={10}>
      {
        collection &&
        collection.map((post, index) => {
          const date = post.createdAt.slice(0, 10);
          const formattedDate = moment(date).format('MMM D, YYYY');

          return  (
            <PostCard searchPostCollection={searchPostCollection} key={index} postId={post._id} userId={post.id} user={post.user} userAvatar={post.userAvatar} timestamps={formattedDate} postDescription={post.postDescription} postThumbnail={post.postThumbnail}/>
          )
        })
      }
      <LitflixFeatures/>
      </Stack>
    </Box>
  )
}

export default Feed