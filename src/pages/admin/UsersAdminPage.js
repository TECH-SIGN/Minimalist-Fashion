import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import { upsertUser, removeUser, queryUsers, toggleUserStatus } from 'services/usersStore';

export default function UsersAdminPage() {
  const [q, setQ] = React.useState('');
  const [role, setRole] = React.useState('all'); // admin | user | all
  const [status, setStatus] = React.useState('all'); // active | inactive | all
  const [page, setPage] = React.useState(1);
  const [pageSize] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [current, setCurrent] = React.useState({ id: '', name: '', email: '', role: 'user', status: 'active', avatar: '', password: '' });
  const [toDelete, setToDelete] = React.useState(null);

  const load = React.useCallback(() => {
    const { items, totalPages: tp } = queryUsers({ q, role, status, page, pageSize });
    setRows(items);
    setTotalPages(tp);
  }, [q, role, status, page, pageSize]);

  React.useEffect(() => { load(); }, [load]);
  React.useEffect(() => {
    const onUpdated = () => load();
    window.addEventListener('users:updated', onUpdated);
    return () => window.removeEventListener('users:updated', onUpdated);
  }, [load]);

  const openAdd = () => { setCurrent({ id: '', name: '', email: '', role: 'user', status: 'active', avatar: '', password: '' }); setEditOpen(true); };
  const openEdit = (u) => { setCurrent({ ...u, password: '' }); setEditOpen(true); };
  const openView = (u) => { setCurrent(u); setViewOpen(true); };

  const save = () => {
    if (!current.name.trim() || !current.email.trim()) return;
    upsertUser(current);
    setEditOpen(false);
    setPage(1);
    load();
  };

  const doDelete = () => {
    if (!toDelete) return;
    removeUser(toDelete.id);
    setConfirmOpen(false);
    setToDelete(null);
    load();
  };

  const onAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCurrent((c) => ({ ...c, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Users</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <TextField size="small" placeholder="Search name or email" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }} />
          <Select size="small" value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} sx={{ minWidth: 140 }}>
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <Select size="small" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} sx={{ minWidth: 160 }}>
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <Button variant="contained" onClick={openAdd}>Add User</Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={56}>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" width={200}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((u) => (
              <TableRow key={u.id} hover>
                <TableCell><Avatar src={u.avatar || undefined} sx={{ width: 36, height: 36 }} /></TableCell>
                <TableCell><Typography variant="subtitle2">{u.name}</Typography></TableCell>
                <TableCell><Typography variant="body2" color="text.secondary">{u.email}</Typography></TableCell>
                <TableCell>
                  <Select size="small" value={u.role} onChange={(e) => upsertUser({ ...u, role: e.target.value })}>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip size="small" label={u.status === 'active' ? 'Active' : 'Inactive'} color={u.status === 'active' ? 'success' : 'default'} variant={u.status === 'active' ? 'filled' : 'outlined'} />
                    <Switch checked={u.status === 'active'} onChange={() => toggleUserStatus(u.id)} />
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" variant="outlined" startIcon={<VisibilityIcon />} onClick={() => openView(u)}>View</Button>
                    <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={() => openEdit(u)}>Edit</Button>
                    <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => { setToDelete(u); setConfirmOpen(true); }}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" />
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{current.id ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar src={current.avatar || undefined} sx={{ width: 64, height: 64 }} />
              <Button component="label" variant="outlined">Upload Picture<input type="file" accept="image/*" hidden onChange={onAvatarFile} /></Button>
            </Stack>
            <TextField label="Name" value={current.name} onChange={(e) => setCurrent({ ...current, name: e.target.value })} fullWidth />
            <TextField label="Email" type="email" value={current.email} onChange={(e) => setCurrent({ ...current, email: e.target.value })} fullWidth />
            {!current.id && (
              <TextField label="Password" type="password" value={current.password} onChange={(e) => setCurrent({ ...current, password: e.target.value })} fullWidth />
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Select size="small" value={current.role} onChange={(e) => setCurrent({ ...current, role: e.target.value })} sx={{ minWidth: 180 }}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              <Select size="small" value={current.status} onChange={(e) => setCurrent({ ...current, status: e.target.value })} sx={{ minWidth: 180 }}>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
            <Avatar src={current.avatar || undefined} sx={{ width: 96, height: 96 }} />
            <Typography variant="h6">{current.name}</Typography>
            <Typography color="text.secondary">{current.email}</Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={current.role} variant="outlined" />
              <Chip label={current.status} color={current.status === 'active' ? 'success' : 'default'} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{toDelete?.name}</strong>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={doDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
