import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Register from "./authentication/Register";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";
import OtherUserProfile from "./Pages/UserProfile";
import Settings from "./components/settings/Settings";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/register" element={<Register/>}/>
          <Route index element={<MainPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user-profile' element={<OtherUserProfile/>}/>
          <Route path="/settings" element={<Settings/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
