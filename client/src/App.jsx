import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Register from "./authentication/Register";
import Signin from "./authentication/Signin";
import MainPage from "./Pages/MainPage";
import Profile from "./Pages/Profile";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/register" element={<Register/>}/>
          <Route index element={<MainPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
