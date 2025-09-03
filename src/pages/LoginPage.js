import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({ email: '', password: '' });

  const validEmail = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!validEmail(form.email)) { setError('Please enter a valid email.'); return; }
    if (!form.password) { setError('Password is required.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 700);
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>Sign In</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={submit}>
        <Stack spacing={2}>
          <TextField label="Email" type="email" fullWidth size="small" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" type={showPass ? 'text' : 'password'} fullWidth size="small" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass((s) => !s)} edge="end">
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" variant="contained" disabled={loading}>Login</Button>
          <Typography variant="body2">Don't have an account? <Button component={Link} to="/signup" size="small">Sign up</Button></Typography>
        </Stack>
      </Box>
    </Container>
  );
}
