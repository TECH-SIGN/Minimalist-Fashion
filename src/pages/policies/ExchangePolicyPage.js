import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ExchangePolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Exchange Policy</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Last updated: {new Date().toLocaleDateString()}</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <section>
          <Typography variant="h6">Eligibility</Typography>
          <Typography color="text.secondary">Items can be exchanged within 7 days of delivery if unused, with original tags and packaging.</Typography>
        </section>
        <section>
          <Typography variant="h6">Process</Typography>
          <Typography color="text.secondary">Contact support with your order number. Once approved, ship the item back; a replacement will be dispatched.</Typography>
        </section>
        <section>
          <Typography variant="h6">Non-Exchangeable Items</Typography>
          <Typography color="text.secondary">Final sale items and gift cards are not eligible for exchange.</Typography>
        </section>
      </Box>
    </Container>
  );
}
