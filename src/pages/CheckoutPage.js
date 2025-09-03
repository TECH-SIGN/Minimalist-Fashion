import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import { useCart } from 'state/CartContext';

const steps = ['Address', 'Delivery', 'Payment', 'Review'];

function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { items, subtotal, clear } = useCart();

  const [address, setAddress] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    save: true,
  });
  const [delivery, setDelivery] = React.useState('standard');
  const [payment, setPayment] = React.useState({ name: '', card: '', exp: '', cvv: '' });
  const [error, setError] = React.useState('');

  const shippingCost = delivery === 'express' ? 14.99 : delivery === 'next' ? 24.99 : 0;
  const total = subtotal + shippingCost;

  const validateStep = () => {
    setError('');
    if (activeStep === 0) {
      const required = ['firstName', 'lastName', 'email', 'phone', 'line1', 'city', 'state', 'zip'];
      const missing = required.filter((k) => !String(address[k]).trim());
      if (missing.length) { setError('Please fill all required address fields.'); return false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address.email)) { setError('Please enter a valid email.'); return false; }
      if (!/^[0-9\-\+\s]{7,}$/.test(address.phone)) { setError('Please enter a valid phone number.'); return false; }
    }
    if (activeStep === 1) {
      if (!delivery) { setError('Please select a delivery method.'); return false; }
    }
    if (activeStep === 2) {
      const { name, card, exp, cvv } = payment;
      if (![name, card, exp, cvv].every((v) => String(v).trim())) { setError('Please complete your payment details.'); return false; }
      const digits = card.replace(/\D/g, '');
      if (digits.length < 12) { setError('Card number looks too short.'); return false; }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) { setError('Expiry must be MM/YY.'); return false; }
      if (!/^\d{3,4}$/.test(cvv)) { setError('CVV must be 3 or 4 digits.'); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((s) => s + 1);
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const placeOrder = () => {
    // Placeholder: clear cart and show confirmation
    clear();
    setActiveStep(steps.length);
  };

  const AddressForm = (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}><TextField label="First name" value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12} md={6}><TextField label="Last name" value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12} md={6}><TextField label="Email" type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12} md={6}><TextField label="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12}><TextField label="Address line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12}><TextField label="Address line 2" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} fullWidth /></Grid>
      <Grid item xs={12} md={4}><TextField label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12} md={4}><TextField label="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12} md={4}><TextField label="ZIP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12}>
        <FormControlLabel control={<Checkbox checked={address.save} onChange={(e) => setAddress({ ...address, save: e.target.checked })} />} label="Save this address for next time" />
      </Grid>
    </Grid>
  );

  const DeliveryForm = (
    <Stack spacing={2}>
      <RadioGroup value={delivery} onChange={(e) => setDelivery(e.target.value)}>
        <FormControlLabel value="standard" control={<Radio />} label="Standard (3-5 days) - Free" />
        <FormControlLabel value="express" control={<Radio />} label="Express (1-2 days) - $14.99" />
        <FormControlLabel value="next" control={<Radio />} label="Next-day - $24.99" />
      </RadioGroup>
    </Stack>
  );

  const PaymentForm = (
    <Grid container spacing={2}>
      <Grid item xs={12}><TextField label="Name on card" value={payment.name} onChange={(e) => setPayment({ ...payment, name: e.target.value })} fullWidth required /></Grid>
      <Grid item xs={12}><TextField label="Card number" value={payment.card} onChange={(e) => setPayment({ ...payment, card: e.target.value })} inputProps={{ inputMode: 'numeric' }} fullWidth required /></Grid>
      <Grid item xs={6}><TextField label="Expiry (MM/YY)" value={payment.exp} onChange={(e) => setPayment({ ...payment, exp: e.target.value })} placeholder="MM/YY" fullWidth required /></Grid>
      <Grid item xs={6}><TextField label="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} inputProps={{ inputMode: 'numeric', maxLength: 4 }} fullWidth required /></Grid>
    </Grid>
  );

  const Review = (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Order Items</Typography>
      <Stack spacing={1}>
        {items.map((i) => (
          <Stack key={i.key} direction="row" justifyContent="space-between">
            <Typography variant="body2">{i.product.title} × {i.qty}</Typography>
            <Typography variant="body2">${(i.product.price * i.qty).toFixed(2)}</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between"><Typography>Subtotal</Typography><Typography>${subtotal.toFixed(2)}</Typography></Stack>
      <Stack direction="row" justifyContent="space-between"><Typography>Shipping</Typography><Typography>{shippingCost ? `$${shippingCost.toFixed(2)}` : 'Free'}</Typography></Stack>
      <Stack direction="row" justifyContent="space-between"><Typography variant="h6">Total</Typography><Typography variant="h6">${total.toFixed(2)}</Typography></Stack>
      <Divider />
      <Typography variant="subtitle2">Ship to</Typography>
      <Typography variant="body2">{address.firstName} {address.lastName}, {address.line1}{address.line2 ? `, ${address.line2}` : ''}, {address.city}, {address.state} {address.zip}</Typography>
      <Typography variant="body2">Email: {address.email} • Phone: {address.phone}</Typography>
    </Stack>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>Checkout</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stepper activeStep={activeStep} sx={{ my: 2 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Paper sx={{ p: 2 }}>
            {activeStep === 0 && AddressForm}
            {activeStep === 1 && DeliveryForm}
            {activeStep === 2 && PaymentForm}
            {activeStep === 3 && Review}
            {activeStep >= steps.length && (
              <Stack spacing={1}>
                <Typography variant="h6">Thank you! 🎉</Typography>
                <Typography color="text.secondary">Your order has been placed. A confirmation email will arrive shortly.</Typography>
              </Stack>
            )}
          </Paper>
          {activeStep < steps.length && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              {activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={handleNext}>Next</Button>
              ) : (
                <Button variant="contained" color="primary" onClick={placeOrder} disabled={!items.length}>Place Order</Button>
              )}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, position: 'sticky', top: 16 }}>
            <Typography variant="subtitle1" gutterBottom>Order Summary</Typography>
            <Stack spacing={1} sx={{ mb: 1 }}>
              {items.slice(0, 4).map((i) => (
                <Stack key={i.key} direction="row" justifyContent="space-between">
                  <Typography variant="body2" noWrap>{i.product.title} × {i.qty}</Typography>
                  <Typography variant="body2">${(i.product.price * i.qty).toFixed(2)}</Typography>
                </Stack>
              ))}
              {items.length > 4 && <Typography variant="caption" color="text.secondary">+ {items.length - 4} more items</Typography>}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between"><Typography>Subtotal</Typography><Typography>${subtotal.toFixed(2)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography>Shipping</Typography><Typography>{shippingCost ? `$${shippingCost.toFixed(2)}` : 'Free'}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography variant="h6">Total</Typography><Typography variant="h6">${total.toFixed(2)}</Typography></Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CheckoutPage;
