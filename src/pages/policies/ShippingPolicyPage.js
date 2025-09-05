import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ShippingPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Shipping Policy</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Last updated: {new Date().toLocaleDateString()}</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <section>
          <Typography variant="h6">Processing Times</Typography>
          <Typography color="text.secondary">Orders are processed within 1-2 business days. During peak periods, processing may take longer.</Typography>
        </section>
        <section>
          <Typography variant="h6">Shipping Methods & Fees</Typography>
          <Typography color="text.secondary">Standard and expedited options are available at checkout. Fees depend on destination and order value.</Typography>
        </section>
        <section>
          <Typography variant="h6">Tracking</Typography>
          <Typography color="text.secondary">A tracking link will be emailed once your order ships. You can also view status in your profile under Orders.</Typography>
        </section>
      </Box>
    </Container>
  );
}
