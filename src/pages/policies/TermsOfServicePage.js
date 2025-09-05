import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TermsOfServicePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Terms of Service</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Last updated: {new Date().toLocaleDateString()}</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <section>
          <Typography variant="h6">Use of the Site</Typography>
          <Typography color="text.secondary">By accessing or using our website, you agree to comply with these terms and all applicable laws and regulations.</Typography>
        </section>
        <section>
          <Typography variant="h6">Accounts</Typography>
          <Typography color="text.secondary">You are responsible for safeguarding your account and for all activities that occur under your credentials.</Typography>
        </section>
        <section>
          <Typography variant="h6">Orders & Payments</Typography>
          <Typography color="text.secondary">All orders are subject to availability and acceptance. Prices are subject to change without notice.</Typography>
        </section>
        <section>
          <Typography variant="h6">Returns & Exchanges</Typography>
          <Typography color="text.secondary">Please refer to our Exchange and Shipping Policies for detailed information.</Typography>
        </section>
        <section>
          <Typography variant="h6">Limitation of Liability</Typography>
          <Typography color="text.secondary">We are not liable for any indirect or consequential damages resulting from the use of our services.</Typography>
        </section>
      </Box>
    </Container>
  );
}
