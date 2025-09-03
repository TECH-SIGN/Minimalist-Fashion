import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const value = React.useMemo(() => {
    if (location.pathname.startsWith('/products')) return 1;
    if (location.pathname.startsWith('/cart')) return 2;
    if (location.pathname.startsWith('/profile')) return 3;
    return 0;
  }, [location.pathname]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none' } }} elevation={3}>
      <BottomNavigation showLabels value={value} onChange={(_, v) => {
        if (v === 0) navigate('/');
        if (v === 1) navigate('/products');
        if (v === 2) navigate('/cart');
        if (v === 3) navigate('/profile');
      }}>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Categories" icon={<CategoryIcon />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default MobileBottomNav;
