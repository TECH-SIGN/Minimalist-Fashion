import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>404</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>Page not found</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" color="primary">
        Go Home
      </Button>
    </Box>
  );
}
