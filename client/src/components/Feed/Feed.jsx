import { Box, Stack } from '@mui/material'
import PostCard from './PostCard'

const Feed = () => {
  return (
    <Box flex='4' display='flex' justifyContent='center'>
      <Stack display='block' spacing={3}>
        <PostCard/>
        <PostCard/>
        <PostCard/>
      </Stack>
    </Box>
  )
}

export default Feed