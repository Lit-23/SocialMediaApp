import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, FormControl, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemButton, OutlinedInput, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";


export default function Settings({ mode, setMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { currentUser } = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.showLoading();
      if (formData.password !== formData.confirmPassword) {
        setError('Confirm Password dont match!');
        Swal.close();
        return;
      };
      if (formData.password.length <= 5) {
        setError('Password must be atleast 6 character!');
        Swal.close();
        return;
      };
      Swal.fire({
        title: "Are you sure?",
        text: "You want to change your password!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then( async (result) => {
        if (result.isConfirmed) {
          const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const data = await res.json();
          setError(null); 
          Swal.fire({
            title: "Good job!",
            text: `Changed password success!`,
            icon: "success"
          });
        }
      });
    } catch (error) {
      setError(error.message);
      Swal.close();
    }
  };

  return (
    <Box bgcolor={"background.default"} color={"text.primary"} height={['100vh']}>
      <Card sx={{maxWidth:600, mx:'auto'}}>
        <CardContent>
          <Typography variant="h6" fontWeight={400}>Settings</Typography>
          <Divider/>

          {/* Change Password Section */}
          <Box onSubmit={handleSubmit} component='form' mb={2}>
            <Typography fontSize={18} fontWeight={300} mt={2}>Change Password</Typography>
            <Stack spacing={2} mt={2}>
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">New Password</InputLabel>
                <OutlinedInput
                  id="password"
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
                  label="New Password"
                />
              </FormControl>

              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
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
                  <Typography variant="p" color="error" sx={{mt:2}}>{error}</Typography>
              }
            </Stack>
            <Button type='submit' variant="contained" sx={{width:'100%', mt:2, fontWeight:400, py:'12px'}}>Change Password</Button>
          </Box>
          <Divider/>

          {/* Dispaly Section */}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Typography fontSize={18} fontWeight={300} mr='auto'>Dark Mode Setting</Typography>
                <Switch checked={mode === 'light' ? false : true} onChange={e=>setMode(mode==="light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}