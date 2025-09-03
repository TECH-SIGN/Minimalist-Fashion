import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';
import Footer from './Footer';
import MiniCartDrawer from './MiniCartDrawer';
import MobileBottomNav from './MobileBottomNav';
import AuthDialog from '../auth/AuthDialog';

function Layout({ children }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth={false} disableGutters sx={{ flex: 1 }}>{children}</Container>
      <Footer />
      <MiniCartDrawer />
      <MobileBottomNav />
      <AuthDialog />
    </Box>
  );
}

export default Layout;
