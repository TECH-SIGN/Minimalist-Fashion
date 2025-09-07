import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';

function AdminDashboardPage() {
  return (
    <Grid container spacing={2} sx={{ py: 1 }}>
      {/* KPI Cards */}
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 0.75, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark' }}>
              <ShoppingCartIcon />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 0.6 }}>ORDERS</Typography>
              <Typography variant="h5" sx={{ lineHeight: 1.2 }}>1,284</Typography>
              <Chip size="small" color="success" icon={<ArrowUpwardIcon />} label="+4.1%" sx={{ mt: 0.25 }} />
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 0.75, borderRadius: 2, bgcolor: 'success.light', color: 'success.dark' }}>
              <MonetizationOnIcon />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 0.6 }}>REVENUE</Typography>
              <Typography variant="h5" sx={{ lineHeight: 1.2 }}>$84,230</Typography>
              <Chip size="small" color="success" icon={<ArrowUpwardIcon />} label="+7.3%" sx={{ mt: 0.25 }} />
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 0.75, borderRadius: 2, bgcolor: 'warning.light', color: 'warning.dark' }}>
              <PeopleIcon />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 0.6 }}>NEW USERS</Typography>
              <Typography variant="h5" sx={{ lineHeight: 1.2 }}>392</Typography>
              <Chip size="small" color="error" icon={<ArrowDownwardIcon />} label="-1.2%" sx={{ mt: 0.25 }} />
            </Box>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 0.75, borderRadius: 2, bgcolor: 'info.light', color: 'info.dark' }}>
              <InventoryIcon />
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 0.6 }}>LOW STOCK</Typography>
              <Typography variant="h5" sx={{ lineHeight: 1.2 }}>21</Typography>
              <Chip size="small" variant="outlined" label="Monitor" sx={{ mt: 0.25 }} />
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {/* Charts / Content */}
      <Grid item xs={12} md={8}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Sales Overview</Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ height: 220, bgcolor: 'background.default', border: '1px dashed', borderColor: 'divider', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">Chart placeholder</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper variant="outlined" sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Recent Activity</Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Stack spacing={1.25}>
            {[1,2,3,4,5].map((i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2">Order #{1230 + i} placed</Typography>
                <Typography variant="caption" color="text.secondary">{i}h ago</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminDashboardPage;
