import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar/Rightbar';
import AddPost from '../components/Feed/AddPost';
import NewMessageCard from '../components/message/NewMessageCard';

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
        <NewMessageCard/>
      </Box>
    </>
  )
}

export default MainPage