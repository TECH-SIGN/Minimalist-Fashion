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
import FormHelperText from '@mui/material/FormHelperText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = React.useState({ active: false, email: '', code: '', seconds: 30 });

  React.useEffect(() => {
    if (!otp.active || otp.seconds <= 0) return; const t = setTimeout(() => setOtp((s) => ({ ...s, seconds: s.seconds - 1 })), 1000); return () => clearTimeout(t);
  }, [otp.active, otp.seconds]);

  const validEmail = (e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
  const rules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'One number', test: (p) => /\d/.test(p) },
    { label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];
  const ok = (p) => rules.every((r) => r.test(p));

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Full name is required.'); return; }
    if (!validEmail(form.email)) { setError('Please enter a valid email.'); return; }
    if (!ok(form.password)) { setError('Please satisfy all password rules.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtp({ active: true, email: form.email, code: '', seconds: 30 }); }, 600);
  };

  const verify = (e) => {
    e.preventDefault();
    setError('');
    if (!/^\d{6}$/.test(otp.code)) { setError('Enter the 6-digit code.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/login'); }, 600);
  };

  const resend = () => { if (otp.seconds === 0) setOtp((s) => ({ ...s, seconds: 30 })); };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!otp.active ? (
        <Box component="form" onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Full Name" fullWidth size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" type="email" fullWidth size="small" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type={showPass ? 'text' : 'password'} fullWidth size="small" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              helperText="Use a strong password that meets the rules below"
              InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPass((s) => !s)} edge="end">{showPass ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>) }}
            />
            <Box sx={{ pl: 0.5 }}>
              {rules.map((r) => {
                const passed = r.test(form.password);
                return (
                  <FormHelperText key={r.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: passed ? 'success.main' : 'text.secondary' }}>
                    {passed ? <CheckCircleIcon fontSize="small" /> : <CancelIcon fontSize="small" />}
                    {r.label}
                  </FormHelperText>
                );
              })}
            </Box>
            <Button type="submit" variant="contained" disabled={loading}>Create Account</Button>
            <Typography variant="body2">Already have an account? <Button component={Link} to="/login" size="small">Sign in</Button></Typography>
          </Stack>
        </Box>
      ) : (
        <Box component="form" onSubmit={verify}>
          <Stack spacing={2}>
            <Typography>We sent a 6-digit code to <strong>{otp.email}</strong></Typography>
            <TextField label="Enter code" inputProps={{ inputMode: 'numeric', maxLength: 6 }} value={otp.code} onChange={(e) => setOtp({ ...otp, code: e.target.value.replace(/\D/g, '').slice(0, 6) })} />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" disabled={loading}>Verify</Button>
              <Button onClick={resend} disabled={otp.seconds > 0}>Resend {otp.seconds > 0 ? `in ${otp.seconds}s` : ''}</Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
