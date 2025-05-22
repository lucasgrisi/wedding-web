import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Navigate, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux'

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ pages }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [cartInfo, setCartInfo] = useState(JSON.parse(localStorage.getItem('CartCache')) || []);

  const cartCount = useSelector(state => state.cart.value);
  const navigate = useNavigate();


  function handleOpenCart() {
    navigate('/checkout');
  }

  function renderCart() {
    let page = window.location.pathname;

    if (page == '/presentes' || page == '/checkout' || page == '/gratidao') {
      return (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenCart}
          
          style={{ color: '#206955' }}
        >
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      )
    }
    
  }

  function renderAppBar() {
    const width = window.innerWidth;

    if (width > 900) {
      
      return (
        <AppBar position="static" style={{ backgroundColor: '#34dbb100' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'black', justifyContent: 'center' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => {navigate(page.route)}}
                    sx={{ my: 2, color: 'white', display: 'block', color: 'black', fontFamily: "Simonetta", fontWeight: '400px' }}
                  >
                    {page.title}
                  </Button>
                ))}
              </Box>
              
              <div>
                {renderCart()}
              </div>

            </Toolbar>
          </Container>
        </AppBar>
      )
    } else {
      return (
        <AppBar position="sticky" style={{ backgroundColor: '#34dbb100' }}>
            <Toolbar style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', minHeight: '60px' }}>

              {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'black', justifyContent: 'center' } }}> */}
                {pages.map((page) => (
                  <Button
                    key={page.title}
                    onClick={() => {navigate(page.route)}}
                    sx={{ my: 2, color: 'white', display: 'block', color: 'black', fontFamily: "Simonetta", fontWeight: '400px', fontSize: "12px" }}
                  >
                    {page.title}
                  </Button>
                ))}
              {/* </Box> */}
              
              <div>
                {renderCart()}
              </div>

            </Toolbar>
        </AppBar>
      )
    }

  }

  useEffect(() => {
    
  }, [hasChange])

  return (
    <>
    {renderAppBar()}
    </>
  );
}
export default ResponsiveAppBar;