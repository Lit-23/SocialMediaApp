import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar/Rightbar';
import AddPost from '../components/Feed/AddPost';

const MainPage = () => {
  return (
    <>
      <Box>
        <Stack direction='row' spacing={2}>
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </Stack>
        <AddPost/>
      </Box>
    </>
  )
}

export default MainPage