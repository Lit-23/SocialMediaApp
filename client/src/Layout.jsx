import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import NavBar from './components/Navbar/Navbar';

const Layout = () => {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <NavBar/>
      <Box mt={2}>
        <Outlet/>
      </Box>
    </Box>
  )
}

export default Layout