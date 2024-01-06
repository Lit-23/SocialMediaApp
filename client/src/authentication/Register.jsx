import { Google } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material"


const Register = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Card sx={{ margin:5, padding:1, width:'100%', maxWidth:'600px' }}>
        <CardContent>
          <Typography variant="h5" color='gray' fontWeight={300}  textAlign="center" mb={3}>
            Register
          </Typography>
          <Box component='form'>
            <Stack spacing={2}>
              <Stack gap={2} direction={{sm:'row', xs:'col'}}>
                <TextField
                  required
                  sx={{width:'100%'}}
                  id="firstName"
                  label="FirstName"
                />
                <TextField
                  required
                  sx={{width:'100%'}}
                  id="lastName"
                  label="LastName"
                />
              </Stack>
              <TextField
                required
                type="email"
                sx={{width:'100%'}}
                id="email"
                label="Email"
                placeholder="example@email"
              />
              <TextField
                required
                type="password"
                sx={{width:'100%'}}
                id="password"
                label="Password"
              />
              <TextField
                required
                type="password"
                sx={{width:'100%'}}
                id="confirmPassword"
                label="Confirm Password"
              />
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
                <Typography sx={{"&:hover":{cursor:'pointer', textDecoration:'underline', transition: 'text-decoration 0.3s ease'}}} color='primary'>Signin</Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register