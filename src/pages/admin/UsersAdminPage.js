import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const seed = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 4 === 0 ? 'admin' : 'customer',
  active: i % 5 !== 0,
}));

export default function UsersAdminPage() {
  const [rows, setRows] = React.useState(seed);
  const toggle = (id) => setRows(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  const setRole = (id, role) => setRows(prev => prev.map(r => r.id === id ? { ...r, role } : r));

  return (
    <Box sx={{ mt: 0 }}>
      <Typography variant="h6" sx={{ mt: 0, mb: 1.25 }}>Users</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id} hover>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>
                  <Select size="small" value={r.role} onChange={(e) => setRole(r.id, e.target.value)}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Switch checked={r.active} onChange={() => toggle(r.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
