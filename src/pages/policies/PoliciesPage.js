import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

export default function PoliciesPage() {
  const items = [
    { to: '/policies/privacy', label: 'Privacy Policy' },
    { to: '/policies/exchange', label: 'Exchange Policy' },
    { to: '/policies/shipping', label: 'Shipping Policy' },
    { to: '/policies/terms', label: 'Terms of Service' },
  ];
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Policies</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Read our store policies and terms.</Typography>
      <List>
        {items.map((it) => (
          <ListItem key={it.to} disablePadding>
            <ListItemButton component={RouterLink} to={it.to}>
              <ListItemText primary={it.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
