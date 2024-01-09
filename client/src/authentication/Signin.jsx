import { Google } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Signin = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(loading) {
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };

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
        setError(true);
        setLoading(false);
        return;
      };      
      // navigate to signin page
      setError(false);
      setLoading(false);
      setAuthenticated(true);

    } catch (error) {
      setError(true);
    }
  };
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Card sx={{ margin:5, padding:1, width:'100%', maxWidth:'600px' }}>
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
                defaultValue={formData.email}
                onChange={handleChange}
              />
              <TextField
                required
                type="password"
                sx={{width:'100%'}}
                id="password"
                label="Password"
                defaultValue={formData.email}
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
                SIGNIN
              </Button>
              <Divider sx={{fontWeight:300}}>OR</Divider>
              <Button 
                startIcon={<Google />}
                variant="contained" 
                color='error'
                sx={{fontWeight:300, py:['12px']}}
              >
                SIGNIN WITH GOOGLE
              </Button>
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