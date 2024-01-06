import { Google } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material"


const Signin = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Card sx={{ margin:5, padding:1, width:'100%', maxWidth:'600px' }}>
        <CardContent>
          <Typography variant="h5" color='gray' fontWeight={300}  textAlign="center" mb={3}>
            Signin
          </Typography>
          <Box component='form'>
            <Stack spacing={2}>
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
                <Typography sx={{"&:hover":{cursor:'pointer', textDecoration:'underline', transition: 'text-decoration 0.3s ease'}}} color='primary'>Signup</Typography>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signin