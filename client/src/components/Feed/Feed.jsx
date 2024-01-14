import { Box, Stack } from '@mui/material';
import PostCard from './PostCard';
import Swal from 'sweetalert2';

const Feed = ({ collection, loading }) => {
  if(loading === true) {
    Swal.showLoading();
  } else {
    Swal.hideLoading();
  };
  return (
    <Box flex='4' display='flex' justifyContent="center">
     <Stack spacing={3} marginBottom={10}>
      {
        collection &&
        collection.map((post, index) => {
          const date = post.createdAt.slice(0, 10);
          return  (
            <PostCard key={index} id={post.id} user={post.user} userAvatar={post.userAvatar} timestamps={date} postDescription={post.postDescription} postThumbnail={post.postThumbnail}/>
          )
        })
      }
      </Stack>
    </Box>
  )
}

export default Feed