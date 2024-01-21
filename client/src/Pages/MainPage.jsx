import { Box, Fab, Stack, Tooltip, } from '@mui/material';
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
import { Add } from '@mui/icons-material';

const MainPage = ({ mode, setMode }) => {
  const { authenticated } = useSelector(state => state.user);

  // add post functionality
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const handleOpen = () => {
    setOpen(true);
    setFormData({
      ...formData, 
      id: currentUser._id, 
      user: `${currentUser.firstName} ${currentUser.lastName}`, 
      userAvatar: currentUser.profilePicture
    });
  };

  // functionality for fetching posts collection
  const [postCollection, setPostCollection] = useState([]);  
  const [reversedPostCollection, setReversedPostCollection] = useState();
  const dispatch = useDispatch();
  const searchPostCollection = async () => {
    try {
      dispatch(getPostListStart());
      const res = await fetch('/api/user/post-list', { method: 'GET' });
      const data = await res.json();
      dispatch(getPostListSuccess(data));
      setPostCollection(data);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      dispatch(getPostListFailure(error));
      console.log('error fetching!');
    }
  };

  // functionality for fetching user collection
  const { currentUser } = useSelector(state => state.user);
  const [userCollection, setUserCollection] = useState([]);
  const searchUserCollection = async () => {
    try {
      dispatch(getUserListStart());
      const res = await fetch('/api/user/user-list', { method: 'GET' });
      const data = await res.json();
      dispatch(getUserListSuccess(data));
      setUserCollection(data);
    } catch (error) {
      dispatch(getUserListFailure(error));
      console.log('error fetching!');
    }
  };
  useEffect(() => {
    searchUserCollection();
    searchPostCollection();
    Swal.showLoading()
    setTimeout(()=>Swal.close(), 600)
  }, []);
  useEffect(() => {
    setReversedPostCollection([...postCollection].reverse());
  }, [postCollection]);


  return (
    <>
      {
        authenticated
        ? <Box bgcolor={"background.default"} color={"text.primary"}>
            <Stack direction='row'>
              <Sidebar setMode={setMode} mode={mode}/>
              <Feed collection={reversedPostCollection} searchPostCollection={searchPostCollection} />
              <Rightbar collection={userCollection}/>
            </Stack>
            <Box>
              <Box position='fixed' bottom={20} left={{xs:'calc(50% - 28px)', md:20}}>
                <Tooltip title="Add New Post">
                  <Fab color="primary" onClick={handleOpen}>
                    <Add />
                  </Fab>
                </Tooltip>
              </Box>
              <AddPost searchCollection={searchPostCollection} open={open} setOpen={setOpen} formData={formData} setFormData={setFormData}/>
            </Box>
            <NewMessageCard/>
          </Box>
        : <Signin/>
      }
    </>
  )
}

export default MainPage