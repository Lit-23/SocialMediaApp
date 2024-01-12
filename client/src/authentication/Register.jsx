import { Google } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupStart, signupFailure, signupSuccess } from "../redux/userSlice/userSlice.js";


const Register = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword) {
      try {
        dispatch(signupStart());
        if(loading) {
          Swal.showLoading();
        } else {
          Swal.hideLoading();
        };

        // fetch data
        const res = await fetch(`/api/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();

        // signup failure
        if(data.success === false) {
          dispatch(signupFailure(data));
          return;
        };      
        // navigate to signin page
        dispatch(signupSuccess(data));
        navigate('/');

      } catch (error) {
        dispatch(signupFailure(error));
      }
    } else {
      setError(true);
    };
  };

  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Card sx={{ width:'100%', maxWidth:'600px' }}>
      {/* xs:{margin:1}, xs:{padding:0}, sm:{margin:5}, sm:{padding:1},  */}
        <CardContent>
          <Typography variant="h5" color='gray' fontWeight={300}  textAlign="center" mb={3}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack gap={2} direction={{sm:'row', xs:'col'}}>
                <TextField
                  required
                  sx={{width:'100%'}}
                  id="firstName"
                  label="FirstName"
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  sx={{width:'100%'}}
                  id="lastName"
                  label="LastName"
                  defaultValue={formData.lastName}
                  onChange={handleChange}
                />
              </Stack>
              <TextField
                required
                type="email"
                sx={{width:'100%'}}
                id="email"
                label="Email"
                placeholder="example@email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
              <TextField
                required
                type="password"
                sx={{width:'100%'}}
                id="password"
                label="Password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
              <TextField
                type="password"
                sx={{width:'100%'}}
                id="confirmPassword"
                label="Confirm Password"
                defaultValue={formData.confirmPassword}
                onChange={handleChange}
              />
              {
                error && <Typography variant="p" color="error" marginX={5} marginBottom={3}>Something went wrong!</Typography>
                // ?  <p className='text-red-700 mx-5 mb-3'>{error.message}</p>
                // || <p className='text-red-700 mx-5 mb-3'>Something went wrong!</p>
                // :  ''
              }
              <Button 
                type="submit" 
                variant="contained" 
                sx={{fontWeight:300, py:['12px']}}
              >
                SIGNUP
              </Button>
              <Divider sx={{fontWeight:300}}>OR</Divider>
              <Button 
                startIcon={<Google />}
                variant="contained" 
                color='error'
                sx={{fontWeight:300, py:['12px']}}
              >
                SIGNUP WITH GOOGLE
              </Button>
              <Box color='gray' display='flex' justifyContent='center' gap={1}>
                <Typography textAlign='center'>Already have an account?</Typography>
                <Typography sx={{"&:hover":{cursor:'pointer', textDecoration:'underline', transition: 'text-decoration 0.3s ease'}}} color='primary' onClick={()=>{navigate('/')}}>Signin</Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register