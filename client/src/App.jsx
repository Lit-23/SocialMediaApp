import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Register from "./authentication/Register";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";
import OtherUserProfile from "./Pages/UserProfile";
import Settings from "./components/settings/Settings";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
// import { useSelector } from "react-redux";

// themeMode

function App() {
  // const { themeMode } = useSelector(state => state.user);
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            Component={() => (
              <Layout setMode={setMode} mode={mode}/>
            )}
          >
            <Route path="/register" element={<Register/>}/>
            <Route 
              index
              Component={() => (
                <MainPage setMode={setMode} mode={mode}/>
              )} 
            />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/user-profile' element={<OtherUserProfile/>}/>
            <Route 
              path="/settings"
              Component={() => (
                <Settings setMode={setMode} mode={mode}/>
              )} 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
