import { Box, Button, Card, CardContent, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signinStart, signinFailure, signinSuccess } from "../redux/userSlice/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "./GoogleAuth.jsx";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const Signin = () => {
  const [formData, setFormData] = useState({});
  const { error } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      Swal.showLoading();
      setTimeout(()=>Swal.close(), 800)

      // fetch data
      const res = await fetch(`/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      // signup failure
      if(data.success === false) {
        dispatch(signinFailure(data));
        return;
      };      
      // navigate to signin page
      dispatch(signinSuccess(data));

    } catch (error) {
      dispatch(signinFailure(error));
    }
  };
  
  // show password functionality
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box sx={{display:'flex', justifyContent:'center'}} bgcolor={"background.default"} color={"text.primary"}>
      <Card sx={{ width:'100%', maxWidth:'600px', marginBottom:50  }}>
        <CardContent>
          <Typography variant="h5" color='gray' fontWeight={300}  textAlign="center" mb={3}>
            Signin
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                required
                type="email"
                sx={{width:'100%'}}
                id="email"
                label="Email"
                placeholder="example@email"
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
              {
                error 
                  ?  <Typography variant="p" color="error" marginX={5} marginBottom={3}>{error.message}</Typography>
                  || <Typography variant="p" color="error" marginX={5} marginBottom={3}>Something went wrong!</Typography>
                  :  ''
              }
              <Button 
                type="submit" 
                variant="contained" 
                sx={{fontWeight:300, py:['12px']}}
              >
                SIGNIN
              </Button>
              <Divider sx={{fontWeight:300}}>OR</Divider>
              <GoogleAuth />
              <Box color='gray' display='flex' justifyContent='center' gap={1}>
                <Typography textAlign='center'>Dont have an account yet?</Typography>
                <Typography sx={{"&:hover":{cursor:'pointer', textDecoration:'underline', transition: 'text-decoration 0.3s ease'}}} color='primary' onClick={()=>{navigate('/register')}}>Signup</Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signin