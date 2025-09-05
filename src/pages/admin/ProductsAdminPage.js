import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import products from 'shared/data/products';
import { getAllProducts, upsertProduct, removeProduct as storeRemove } from 'services/productsStore';

export default function ProductsAdminPage() {
  const [q, setQ] = React.useState('');
  const [rows, setRows] = React.useState(getAllProducts().slice(0, 50));
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ id: '', title: '', price: '', brand: '', category: '', image: '' });

  const filtered = rows.filter(r => r.title.toLowerCase().includes(q.toLowerCase()));

  const openCreate = () => {
    setForm({ id: '', title: '', price: '', brand: '', category: '', image: '' });
    setOpen(true);
  };

  const save = () => {
    if (!form.title.trim() || !form.price) return;
    const id = form.id || Date.now();
    const next = upsertProduct({ ...form, id, price: Number(form.price) });
    // Refresh from store to reflect latest state
    setRows(getAllProducts().slice(0, 50));
    setOpen(false);
  };

  const edit = (r) => {
    setForm({ id: r.id, title: r.title, price: r.price, brand: r.brand || '', category: r.category || '', image: r.image || '' });
    setOpen(true);
  };

  const remove = (id) => {
    storeRemove(id);
    setRows(getAllProducts().slice(0, 50));
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ mb: 2 }}>
        <Typography variant="h6">Products</Typography>
        <Stack direction="row" spacing={1}>
          <TextField size="small" placeholder="Search products" value={q} onChange={e => setQ(e.target.value)} />
          <Button variant="contained" onClick={openCreate}>New Product</Button>
        </Stack>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>
                  {r.image ? (
                    <Box component="img" src={r.image} alt={r.title} sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1 }} />
                  ) : (
                    <Box sx={{ width: 48, height: 48, bgcolor: 'action.hover', borderRadius: 1 }} />
                  )}
                </TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.brand}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell align="right">${r.price?.toFixed?.(2) ?? r.price}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => edit(r)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => remove(r.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{form.id ? 'Edit Product' : 'New Product'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} fullWidth />
            <TextField label="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} fullWidth />
            <TextField label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} fullWidth />
            <TextField label="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} fullWidth />
            <Stack direction="row" spacing={2} alignItems="center">
              <Box component="img" src={form.image || undefined} alt="preview" sx={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 1, bgcolor: 'action.hover' }} />
              <Button component="label" variant="outlined">
                Upload Image
                <input type="file" accept="image/*" hidden onChange={onFile} />
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
