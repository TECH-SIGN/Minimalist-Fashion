import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/SpaceDashboardOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptIcon from '@mui/icons-material/ReceiptLongOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutline';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const items = [
    { to: '/admin', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/admin/products', label: 'Products', icon: <InventoryIcon /> },
    { to: '/admin/orders', label: 'Orders', icon: <ReceiptIcon /> },
    { to: '/admin/users', label: 'Users', icon: <PeopleIcon /> },
    { to: '/admin/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
      open
    >
      <List>
        {items.map((it) => (
          <ListItem key={it.to} disablePadding>
            <ListItemButton component={Link} to={it.to} selected={pathname === it.to}>
              <ListItemIcon>{it.icon}</ListItemIcon>
              <ListItemText primary={it.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
