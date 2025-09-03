import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { useWishlist } from 'state/WishlistContext';

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function ProfilePage() {
  const [tab, setTab] = React.useState(0);
  const { items: wishlist, toggle } = useWishlist();

  // Mock orders for demo
  const [orders] = React.useState(
    Array.from({ length: 6 }).map((_, i) => ({
      id: 2000 + i,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      total: 39.99 + i * 12,
      status: ['Processing', 'Shipped', 'Delivered'][i % 3],
      items: Math.ceil(Math.random() * 4),
    }))
  );

  // Addresses state and dialog
  const [addresses, setAddresses] = React.useState([
    { id: 1, name: 'Home', line1: '221B Baker Street', city: 'London', state: '', zip: 'NW1', country: 'UK' },
  ]);
  const [addrOpen, setAddrOpen] = React.useState(false);
  const [addrForm, setAddrForm] = React.useState({ id: '', name: '', line1: '', city: '', state: '', zip: '', country: '' });

  const openNewAddr = () => { setAddrForm({ id: '', name: '', line1: '', city: '', state: '', zip: '', country: '' }); setAddrOpen(true); };
  const openEditAddr = (a) => { setAddrForm(a); setAddrOpen(true); };
  const saveAddr = () => {
    if (!addrForm.name.trim() || !addrForm.line1.trim()) return;
    const id = addrForm.id || Date.now();
    const next = { ...addrForm, id };
    setAddresses((prev) => {
      const exists = prev.some((p) => p.id === id);
      return exists ? prev.map((p) => (p.id === id ? next : p)) : [next, ...prev];
    });
    setAddrOpen(false);
  };
  const deleteAddr = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  // Settings
  const [settings, setSettings] = React.useState({ name: 'John Doe', email: 'john@example.com' });
  const saveSettings = () => {
    // integrate with API later
    // eslint-disable-next-line no-alert
    alert('Profile updated');
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>My Account</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Orders" />
        <Tab label="Wishlist" />
        <Tab label="Addresses" />
        <Tab label="Settings" />
      </Tabs>

      {/* Orders */}
      <TabPanel value={tab} index={0}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>
                    <Button component={Link} to={`/orders/${o.id}`} size="small">{o.id}</Button>
                  </TableCell>
                  <TableCell>{o.date}</TableCell>
                  <TableCell>{o.items}</TableCell>
                  <TableCell align="right">${o.total.toFixed(2)}</TableCell>
                  <TableCell>{o.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Wishlist */}
      <TabPanel value={tab} index={1}>
        {wishlist.length === 0 ? (
          <Stack alignItems="center" spacing={1} sx={{ py: 4, color: 'text.secondary' }}>
            <FavoriteBorderIcon />
            <Typography>No items in wishlist</Typography>
          </Stack>
        ) : (
          <Grid container spacing={2} sx={{ mt: 0 }}>
            {wishlist.map((p) => (
              <Grid key={p.id} item xs={12} sm={6} md={4}>
                <Paper variant="outlined" sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <img alt={p.title} src={`https://picsum.photos/seed/${p.id}/120/90`} width={96} height={72} style={{ borderRadius: 8, objectFit: 'cover' }} loading="lazy" />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap title={p.title}>{p.title}</Typography>
                    <Typography variant="body2" color="text.secondary">${p.price?.toFixed?.(2) ?? p.price}</Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button size="small" component={Link} to={`/product/${p.id}`}>View</Button>
                      <Button size="small" color="error" onClick={() => toggle(p)}>Remove</Button>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>

      {/* Addresses */}
      <TabPanel value={tab} index={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Saved Addresses</Typography>
          <Button variant="contained" onClick={openNewAddr}>Add Address</Button>
        </Stack>
        <Stack spacing={2}>
          {addresses.map((a) => (
            <Paper key={a.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2">{a.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{a.line1}</Typography>
                  <Typography variant="body2" color="text.secondary">{[a.city, a.state, a.zip].filter(Boolean).join(', ')}</Typography>
                  <Typography variant="body2" color="text.secondary">{a.country}</Typography>
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => openEditAddr(a)} aria-label="edit address"><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteAddr(a.id)} aria-label="delete address"><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              </Stack>
            </Paper>
          ))}
        </Stack>

        <Dialog open={addrOpen} onClose={() => setAddrOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{addrForm.id ? 'Edit Address' : 'Add Address'}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Label" placeholder="Home / Office" value={addrForm.name} onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })} />
              <TextField label="Address Line" value={addrForm.line1} onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="City" fullWidth value={addrForm.city} onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })} /></Grid>
                <Grid item xs={12} sm={3}><TextField label="State" fullWidth value={addrForm.state} onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })} /></Grid>
                <Grid item xs={12} sm={3}><TextField label="ZIP" fullWidth value={addrForm.zip} onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })} /></Grid>
              </Grid>
              <TextField label="Country" value={addrForm.country} onChange={(e) => setAddrForm({ ...addrForm, country: e.target.value })} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddrOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={saveAddr}>Save</Button>
          </DialogActions>
        </Dialog>
      </TabPanel>

      {/* Settings */}
      <TabPanel value={tab} index={3}>
        <Paper variant="outlined" sx={{ p: 2, maxWidth: 520 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Profile Settings</Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <TextField label="Full Name" value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} />
            <TextField label="Email" type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={saveSettings}>Save</Button>
              <Button component={Link} to="/orders" variant="text">View Orders</Button>
            </Stack>
          </Stack>
        </Paper>
      </TabPanel>
    </Box>
  );
}

export default ProfilePage;
