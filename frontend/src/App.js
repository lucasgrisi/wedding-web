import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ResponsiveAppBar from './components/AppBar';
import Evento from './components/Evento';
import Presentes from './components/Presentes';
import Presenca from './components/Presenca';
import { useEffect } from 'react';
import CheckOut from './components/CheckOut';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import backgroundImage from './assets/bg2.png';
import './App.css';
import Dicas from './components/Dicas';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';
import Gratidao from './components/Gratidao';

function App() {
  const pages = [
    {title: 'Home', route: '/'}, 
    {title: 'RSVP', route: '/presenca'},
    {title: 'Cerimônia', route: '/cerimonia'}, 
    {title: 'Dicas', route: '/dicas'},
    {title: 'Presentes', route: '/presentes'},
  ];

  function setPresencaCache() {
    const presencaCache = localStorage.getItem('PresencaCache') || "";
    if (!presencaCache) {
      let initialCache = {
        name: '',
        email: '',
        obs: '',
        nAdults: 1,
        nChildren: 0,
        phone: '',
      };
      localStorage.setItem('PresencaCache', JSON.stringify(initialCache));
    }
  }

  function setCartInitialState() {
    const cartCache = localStorage.getItem('CartCache') || "";
    if (!cartCache) {
      let initialCache = [];
      localStorage.setItem('CartCache', JSON.stringify(initialCache));
    }
  }
  function setUserInfoInitialState() {
    const UserInfoCache = localStorage.getItem('UserInfoCache') || "";
    if (!UserInfoCache) {
      let initialCache = {
        name: '',
        email: '',
        message: '',
      };
      localStorage.setItem('UserInfoCache', JSON.stringify(initialCache));
    }
  }

  function setAdminCache() {
    const AdminCache = localStorage.getItem('AdminCache') || "";
    if (!AdminCache) {
      let initialCache = {
        username: '',
        password: '',
      };
      localStorage.setItem('AdminCache', JSON.stringify(initialCache));
    }
  }

  useEffect(() => {
    setCartInitialState();
    setUserInfoInitialState();
    setPresencaCache();
    setAdminCache();
    initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);
  }, []);
  return (
    <div>
    <Router>
      {window.location.pathname.includes('/admin') ? (
        ''
      ) : (
        <ResponsiveAppBar pages={pages}/>
      ) }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cerimonia" element={<Evento />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/checkout" element={< CheckOut/>}/>
        <Route path="/presenca" element={<Presenca />} />
        <Route path="/dicas" element={<Dicas />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gratidao" element={<Gratidao />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
