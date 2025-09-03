import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 3, textAlign: 'center', color: 'text.secondary' }}>
      <Typography variant="body2">© {new Date().getFullYear()} E-Shop. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
