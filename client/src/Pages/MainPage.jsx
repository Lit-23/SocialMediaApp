import { Box, Stack, } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Rightbar from '../components/Rightbar/Rightbar';
import AddPost from '../components/Feed/AddPost';
import NewMessageCard from '../components/message/NewMessageCard';
import Signin from '../authentication/Signin';
import { useSelector, useDispatch } from 'react-redux';
import { getPostListStart, getPostListFailure, getPostListSuccess, } from '../redux/postSlice/postSlice.js';
import { getUserListStart, getUserListFailure, getUserListSuccess } from '../redux/userSlice/userSlice.js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const MainPage = () => {
  const { authenticated } = useSelector(state => state.user);

  // functionality for fetching posts collection
  const [postCollection, setPostCollection] = useState([]);
  const { postLoading } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const searchPostCollection = async () => {
    try {
      dispatch(getPostListStart());
      if(postLoading === true) {
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };
      const res = await fetch('/api/user/post-list', { method: 'GET' });
      const data = await res.json();
      dispatch(getPostListSuccess(data));
      setPostCollection(data);
    } catch (error) {
      dispatch(getPostListFailure(error));
      console.log('error fetching!');
    }
  };
  useEffect(() => {
    searchPostCollection();
  }, []);

  // functionality for fetching user collection
  const [userCollection, setUserCollection] = useState([]);
  const { loading } = useSelector(state => state.user);
  const searchUserCollection = async () => {
    try {
      dispatch(getUserListStart());
      if(loading === true) {
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };
      const res = await fetch('/api/user/user-list', { method: 'GET' });
      const data = await res.json();
      dispatch(getUserListSuccess(data));
      setUserCollection(data);
      console.log(postCollection);
    } catch (error) {
      dispatch(getUserListFailure(error));
      console.log('error fetching!');
    }
  };
  useEffect(() => {
    searchUserCollection();
  }, []);


  return (
    <>
      {
        authenticated
        ? <Box>
           <Stack direction='row'>
            <Sidebar/>
            <Feed collection={postCollection} loading={loading} />
            <Rightbar collection={userCollection}/>
           </Stack>
           <AddPost searchCollection={searchPostCollection}/>
           <NewMessageCard/>
          </Box>
        : <Signin/>
      }
    </>
  )
}

export default MainPage