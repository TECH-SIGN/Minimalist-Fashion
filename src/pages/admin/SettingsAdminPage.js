import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SettingsAdminPage() {
  const [store, setStore] = React.useState({ name: 'My Store', currency: 'USD', supportEmail: 'support@example.com' });

  const save = () => {
    // In real app, call API. Here we just no-op.
    // eslint-disable-next-line no-alert
    alert('Settings saved');
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Settings</Typography>
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <TextField label="Store Name" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
        <TextField label="Currency" value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })} />
        <TextField label="Support Email" type="email" value={store.supportEmail} onChange={(e) => setStore({ ...store, supportEmail: e.target.value })} />
        <Button variant="contained" onClick={save}>Save</Button>
      </Stack>
    </Box>
  );
}
