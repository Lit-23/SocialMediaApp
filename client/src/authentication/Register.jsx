import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupStart, signupFailure, signupSuccess } from "../redux/userSlice/userSlice.js";
import GoogleAuth from "./GoogleAuth.jsx";


const Register = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword) {
      try {
        Swal.showLoading();
        setTimeout(()=>Swal.close(), 800)
        dispatch(signupStart());

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
  
  // show password functionality
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{display:'flex', justifyContent:'center'}} bgcolor={"background.default"} color={"text.primary"}>
      <Card sx={{ width:'100%', maxWidth:'600px', marginBottom:20 }}>
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
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  required
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  required
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
              {
                error && 
                <Typography variant="p" color="error" marginX={5} marginBottom={3}>
                  Something went wrong!
                </Typography>
              }
              <Button 
                type="submit" 
                variant="contained" 
                sx={{fontWeight:300, py:['12px']}}
              >
                SIGNUP
              </Button>
              <Divider sx={{fontWeight:300}}>OR</Divider>
              <GoogleAuth />
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