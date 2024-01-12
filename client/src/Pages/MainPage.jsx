import { Box, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar/Rightbar';
import AddPost from '../components/Feed/AddPost';
import NewMessageCard from '../components/message/NewMessageCard';
import Signin from '../authentication/Signin';
import { useSelector, useDispatch } from 'react-redux';
import { addPostFailure, addPostStart, addPostSuccess } from '../redux/postSlice/postSlice.js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MainPage = () => {
  const { authenticated } = useSelector(state => state.user);

  // functionality for fetching posts collection
  const [collection, setCollection] = useState([]);
  const { loading } = useSelector(state => state.post);
  console.log(loading)
  const dispatch = useDispatch();
  const searchCollection = async () => {
    try {
      dispatch(addPostStart());
      if(loading === true) {
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };
      const res = await fetch('/api/user/post-list', { method: 'GET' });
      const data = await res.json();
      dispatch(addPostSuccess(data));
      setCollection(data);
      console.log(collection);
    } catch (error) {
      dispatch(addPostFailure(error));
      console.log('error fetching!');
    }
  };
  useEffect(() => {
    searchCollection();
  }, [])

  return (
    <>
      {
        authenticated
        ? <Box>
           <Stack direction='row' spacing={2}>
            <Sidebar/>
            <Feed collection={collection} loading={loading} />
            <Rightbar/>
           </Stack>
           <AddPost searchCollection={searchCollection}/>
           <NewMessageCard/>
          </Box>
        : <Signin/>
      }
    </>
  )
}

export default MainPage