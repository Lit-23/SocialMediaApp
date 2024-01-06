import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import NavBar from './components/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar/>
      <Box mt={2}>
        <Outlet/>
      </Box>
    </>
  )
}

export default Layout