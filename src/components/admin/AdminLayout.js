import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AdminSidebar from './AdminSidebar';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100%' }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin</Typography>
            <IconButton>
              <Badge badgeContent={2} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
