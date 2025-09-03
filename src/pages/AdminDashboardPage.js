import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function AdminDashboardPage() {
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Sales Overview</Typography>
          <Typography color="text.secondary">Chart placeholder</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Users</Typography>
          <Typography color="text.secondary">Chart placeholder</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminDashboardPage;
