import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getAllProducts } from 'services/productsStore';
import { getProductImage, onImgErrorSwap } from 'core/utils/imageForProduct';

const STORAGE_KEY = 'home:config';

function loadConfig() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function HomePage() {
  const [cfg, setCfg] = React.useState(loadConfig());
  const [all, setAll] = React.useState(getAllProducts());

  React.useEffect(() => {
    const onUpdate = () => setAll(getAllProducts());
    window.addEventListener('products:updated', onUpdate);
    return () => window.removeEventListener('products:updated', onUpdate);
  }, []);

  React.useEffect(() => {
    const onStorage = () => setCfg(loadConfig());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const primarySx = cfg.themeMode === 'custom' ? { bgcolor: cfg.customPrimaryColor, '&:hover': { filter: 'brightness(0.9)' } } : undefined;

  const featured = React.useMemo(() => {
    if (!Array.isArray(cfg.featuredProducts) || !cfg.featuredProducts.length) return [];
    const set = new Set(cfg.featuredProducts);
    return all.filter((p) => set.has(p.id));
  }, [cfg.featuredProducts, all]);

  const newArrivals = React.useMemo(() => all.slice(-8), [all]);
  const bestSellers = React.useMemo(() => [...all].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8), [all]);
  const discounts = React.useMemo(() => all.filter((p) => p.price <= 30).slice(0, 8), [all]);

  const renderProducts = (items) => (
    <Grid container spacing={2}>
      {items.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={3}>
          <Paper variant="outlined" sx={{ p: 1, height: '100%' }}>
            <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
              <img src={getProductImage(p, { w: 600, h: 400 })} alt={p.title} width="100%" height={160} style={{ objectFit: 'cover' }} onError={(e) => onImgErrorSwap(e, p, { w: 600, h: 400 })} />
            </Box>
            <Typography variant="subtitle2" sx={{ mt: 1 }} noWrap>{p.title}</Typography>
            <Typography variant="caption" color="text.secondary">${p.price}</Typography>
            <Box sx={{ mt: 1 }}>
              <Button size="small" component={Link} to={`/product/${p.id}`} variant="text">View</Button>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          {cfg.welcomeText || 'Welcome to E-Shop'}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {cfg.banner?.ctaText || 'Discover the latest products with a smooth shopping experience.'}
        </Typography>
        <Button component={Link} to="/products" variant="contained" size="large" sx={{ mt: 2, ...primarySx }}>
          {cfg.banner?.buttonText || 'Shop Now'}
        </Button>
      </Box>

      {cfg.banner?.image && (
        <Box sx={{ mb: 4 }}>
          <img src={cfg.banner.image} alt="banner" style={{ width: '100%', borderRadius: 12, maxHeight: 360, objectFit: 'cover' }} />
        </Box>
      )}

      {featured.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Featured Products</Typography>
          {renderProducts(featured)}
        </Box>
      )}

      {cfg.widgets?.newArrivals !== false && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>New Arrivals</Typography>
          {renderProducts(newArrivals)}
        </Box>
      )}

      {cfg.widgets?.bestSellers && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Best Sellers</Typography>
          {renderProducts(bestSellers)}
        </Box>
      )}

      {cfg.widgets?.discounts && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Deals & Discounts</Typography>
          {renderProducts(discounts)}
        </Box>
      )}

      {cfg.widgets?.testimonials && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>What our customers say</Typography>
          <Grid container spacing={2}>
            {["Great quality and fast shipping!", "Amazing customer support.", "Best prices I've found online."].map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography>“{t}”</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
