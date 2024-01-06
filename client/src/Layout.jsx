import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import NavBar from './components/Navbar/Navbar';

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