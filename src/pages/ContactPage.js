import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    // Demo only
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Contact us</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>We'd love to hear from you. Fill out the form and we’ll get back soon.</Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box component="form" onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" fullWidth size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" type="email" fullWidth size="small" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Message" fullWidth multiline minRows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">Send</Button>
              {sent && <Typography variant="body2" sx={{ ml: 2 }} color="success.main">Message sent!</Typography>}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
