import { Box, Stack } from '@mui/material';
import PostCard from './PostCard';
import Swal from 'sweetalert2';

const Feed = ({ collection, loading, searchPostCollection }) => {
  // if(loading === true) {
  //   Swal.showLoading();
  // } else {
  //   Swal.close();
  // };
  return (
    <Box flex='4' display='flex' justifyContent="center">
     <Stack spacing={3} marginBottom={10}>
      {
        collection &&
        collection.map((post, index) => {
          const date = post.createdAt.slice(0, 10);
          return  (
            <PostCard searchPostCollection={searchPostCollection} key={index} postId={post._id} userId={post.id} user={post.user} userAvatar={post.userAvatar} timestamps={date} postDescription={post.postDescription} postThumbnail={post.postThumbnail}/>
          )
        })
      }
      </Stack>
    </Box>
  )
}

export default Feed