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
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function AdminLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;
  const closedWidth = 72;
  const [open, setOpen] = React.useState(() => {
    const saved = localStorage.getItem('adminSidebarOpen');
    return saved !== null ? saved === 'true' : !isMobile;
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const userMenuOpen = Boolean(anchorEl);
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  React.useEffect(() => {
    // When breakpoint changes, default to open on desktop and closed on mobile unless user set a preference
    const saved = localStorage.getItem('adminSidebarOpen');
    if (saved === null) {
      setOpen(!isMobile);
    }
  }, [isMobile]);

  React.useEffect(() => {
    localStorage.setItem('adminSidebarOpen', String(open));
  }, [open]);

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
            <Paper component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', px: 1, py: 0.5, borderRadius: 6, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', minWidth: 260 }}>
              <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
              <InputBase placeholder="Search…" sx={{ flex: 1 }} inputProps={{ 'aria-label': 'Search admin' }} />
            </Paper>
            <IconButton aria-label="Notifications">
              <Badge badgeContent={2} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Account">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={userMenuOpen} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
              <Divider />
              <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
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
