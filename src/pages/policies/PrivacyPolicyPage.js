import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PrivacyPolicyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Privacy Policy</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Last updated: {new Date().toLocaleDateString()}</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <section>
          <Typography variant="h6">Information We Collect</Typography>
          <Typography color="text.secondary">We collect information you provide, such as name, email, and address, as well as usage data to improve our services.</Typography>
        </section>
        <section>
          <Typography variant="h6">How We Use Information</Typography>
          <Typography color="text.secondary">To process orders, provide customer support, personalize your experience, and communicate updates or offers.</Typography>
        </section>
        <section>
          <Typography variant="h6">Your Rights</Typography>
          <Typography color="text.secondary">You can request access, correction, or deletion of your personal data by contacting support.</Typography>
        </section>
      </Box>
    </Container>
  );
}
