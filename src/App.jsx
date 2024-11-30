import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Header,Footer } from './components/index';

import './App.css'
import { Outlet } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.log("Error in App.jsx useEffect:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col bg-gray-100"> 
      <Header />
      <main className="flex-grow bg-gray-100"> 
        <Outlet/>
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
