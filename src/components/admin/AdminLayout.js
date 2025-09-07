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
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Brightness4Icon from '@mui/icons-material/Brightness4Outlined';
import Brightness7Icon from '@mui/icons-material/Brightness7Outlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from 'state/AuthContext';
import { useColorMode } from 'theme';
import { useNotifications } from 'state/NotificationsContext';

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;
  const closedWidth = 72;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userMenuOpen = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleColorMode, mode } = useColorMode();
  const { unread, items, markAllRead } = useNotifications();
  const [notifEl, setNotifEl] = React.useState(null);
  const notifOpen = Boolean(notifEl);
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Close overlay on breakpoint changes (avoid stale open state when resizing)
  React.useEffect(() => {
    setOpen(false);
  }, [isMobile]);

  // Close overlay drawer on route changes for consistency
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100%', width: '100%', overflowX: 'hidden' }}>
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'saturate(180%) blur(6px)',
            zIndex: (t) => t.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton edge="start" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>
              <MenuIcon />
            </IconButton> 
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>Admin</Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <Paper component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', px: 1, py: 0.5, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', minWidth: 260 }}>
              <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <InputBase placeholder="Search…" sx={{ flex: 1 }} inputProps={{ 'aria-label': 'Search admin' }} />
            </Paper> */}
            <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton aria-label="Toggle color mode" onClick={toggleColorMode}>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton aria-label="Notifications" onClick={(e) => setNotifEl(e.currentTarget)}>
                <Badge badgeContent={unread} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={notifEl} open={notifOpen} onClose={() => setNotifEl(null)} PaperProps={{ sx: { width: 320 } }}>
              <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">Notifications</Typography>
                <Button size="small" onClick={() => { markAllRead(); }}>Mark all read</Button>
              </Box>
              <Divider />
              <List dense sx={{ py: 0 }}>
                {items.slice(0, 8).map((n) => (
                  <ListItem key={n.id} sx={{ bgcolor: n.read ? 'transparent' : 'action.hover' }}>
                    <ListItemText
                      primary={<Typography variant="body2" noWrap>{n.title}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{new Date(n.ts).toLocaleString()}</Typography>}
                    />
                  </ListItem>
                ))}
                {items.length === 0 && (
                  <ListItem><ListItemText primary={<Typography variant="body2" color="text.secondary">No notifications</Typography>} /></ListItem>
                )}
              </List>
            </Menu>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 1 }} aria-label="account menu">
                <Avatar src={user?.avatar || undefined} sx={{ width: 32, height: 32, boxShadow: 1, border: '1px solid', borderColor: 'divider' }}>
                  {(!user?.avatar) && (user?.name || user?.email || 'U').slice(0,1).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={userMenuOpen} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>Profile</MenuItem>
              <MenuItem onClick={() => { setAnchorEl(null); navigate('/admin/settings'); }}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate('/admin/login'); }}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {/* Content wrapper: no left offset, so opening the drawer never shifts content */}
        <Box sx={{ width: '100%', ml: 0, overflowX: 'hidden' }}>
          <Container maxWidth={false} sx={{ px: { xs: 1.5, md: 2 }, pt: 0, pb: 2 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0, mt: 2 }}>
              <Link component={RouterLink} underline="hover" color="inherit" to="/admin">Dashboard</Link>
              {pathnames.slice(1).map((segment, index) => {
                const to = `/${pathnames.slice(0, index + 2).join('/')}`;
                const label = segment.replaceAll('-', ' ');
                const isLast = index === pathnames.slice(1).length - 1;
                return isLast ? (
                  <Typography key={to} color="text.primary" sx={{ textTransform: 'capitalize' }}>{label}</Typography>
                ) : (
                  <Link key={to} component={RouterLink} underline="hover" color="inherit" to={to} sx={{ textTransform: 'capitalize' }}>
                    {label}
                  </Link>
                );
              })}
            </Breadcrumbs>
            <Box sx={{
              mt: 0,
              '& > :first-of-type': { mt: 0 },
              '& h1, & h2, & h3, & h4, & h5, & h6': { mt: 0 },
              '& .MuiTypography-h4, & .MuiTypography-h5, & .MuiTypography-h6': { mt: 0, mb: 0.75 },
            }}>
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
