import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

export default function OrdersPage() {
  const [rows] = React.useState(
    Array.from({ length: 6 }).map((_, i) => ({
      id: 2000 + i,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      total: 39.99 + i * 12,
      status: ['Processing', 'Shipped', 'Delivered'][i % 3],
      items: Math.ceil(Math.random() * 4),
    }))
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Your Orders</Typography>
      <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell>{o.items}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell align="right">${o.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mt: 2 }} />
        <Typography variant="caption" color="text.secondary">Note: Demo orders are local to your session.</Typography>
      </Paper>
    </Box>
  );
}
