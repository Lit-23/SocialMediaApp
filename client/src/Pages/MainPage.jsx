import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar/Rightbar';
import AddPost from '../components/Feed/AddPost';
import NewMessageCard from '../components/message/NewMessageCard';
import Signin from '../authentication/Signin';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { authenticated } = useSelector(state => state.user);

  return (
    <>
      {
        authenticated
        ? <Box>
          <Stack direction='row' spacing={2}>
            <Sidebar/>
            <Feed/>
            <Rightbar/>
          </Stack>
          <AddPost/>
          <NewMessageCard/>
          </Box>
        : <Signin/>
      }
    </>
  )
}

export default MainPage