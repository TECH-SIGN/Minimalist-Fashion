import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>Welcome to E-Shop</Typography>
      <Typography color="text.secondary" gutterBottom>Discover the latest products with a smooth shopping experience.</Typography>
      <Button component={Link} to="/products" variant="contained" size="large" sx={{ mt: 2 }}>Shop Now</Button>
    </Box>
  );
}

export default HomePage;
