import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signinSuccess } from "../redux/userSlice/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const GoogleAuth = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/user/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePicture: result.user.photoURL,
          firstName: result.user.displayName.split(" ")[0],
          lastName: result.user.displayName.split(" ")[1],
          email: result.user.email,
        }),
      });
      const data = await res.json();
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button 
      startIcon={<Google />}
      variant="contained" 
      color='error'
      sx={{fontWeight:300, py:['12px']}}
      onClick={handleGoogleClick}
    >
      SIGNUP WITH GOOGLE
    </Button>
  )
}

export default GoogleAuth