import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Outlet } from "react-router-dom";
import Container from "./Components/Container";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then(userData => {
      
      if(userData) dispatch(login(userData))
      else dispatch(logout());
    })
    .finally(() => setLoading(false));
  }, [])  

  return !loading ? (
    <div className="flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
         <Header/>
           <Container>
           <Outlet />
           </Container>
         <Footer/>
      </div>
    </div>
  ) : (
    <h1>loading</h1>
  )
}

export default App
