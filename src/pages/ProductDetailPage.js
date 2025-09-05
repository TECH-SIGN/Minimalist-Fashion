import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import { getAllProducts } from 'services/productsStore';
import { useCart } from 'state/CartContext';
import { getGalleryImages, getProductImage, onImgErrorSwap } from 'core/utils/imageForProduct';

function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [all, setAll] = React.useState(getAllProducts());
  React.useEffect(() => {
    const onUpdate = () => setAll(getAllProducts());
    window.addEventListener('products:updated', onUpdate);
    return () => window.removeEventListener('products:updated', onUpdate);
  }, []);
  const product = React.useMemo(() => all.find((p) => String(p.id) === String(id)), [all, id]);
  const images = React.useMemo(() => getGalleryImages(product, 5, { w: 800, h: 600 }), [product]);
  const [active, setActive] = React.useState(0);
  const [color, setColor] = React.useState(product?.color || '');
  const [size, setSize] = React.useState(product?.size || '');

  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Grid container spacing={3} sx={{ py: 3 }}>
      <Grid item xs={12} md={6}>
        <Box
          component="img"
          src={images[active]}
          alt={product.title}
          loading="lazy"
          onError={(e) => onImgErrorSwap(e, product, { w: 800, h: 600, index: active })}
          sx={{
            width: '100%',
            height: 420,
            borderRadius: 2,
            bgcolor: 'action.hover',
            objectFit: 'cover',
            boxShadow: (t) => t.shadows[2],
          }}
        />
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {images.map((src, i) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={`${product.title} ${i + 1}`}
              loading="lazy"
              onClick={() => setActive(i)}
              onError={(e) => onImgErrorSwap(e, product, { w: 800, h: 600, index: i })}
              sx={{
                width: 70,
                height: 70,
                borderRadius: 1.5,
                objectFit: 'cover',
                cursor: 'pointer',
                outline: i === active ? '2px solid' : '2px solid transparent',
                outlineColor: i === active ? 'primary.main' : 'transparent',
                transition: 'transform .15s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>{product.title}</Typography>
        <Rating value={product.rating} precision={0.5} readOnly sx={{ mb: 1 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>${product.price.toFixed(2)}</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>{product.description}</Typography>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Color</Typography>
            <ToggleButtonGroup size="small" color="primary" exclusive value={color} onChange={(_, v) => v && setColor(v)}>
              {[product.color, 'Black', 'White'].filter(Boolean).map((c) => (
                <ToggleButton key={c} value={c}>{c}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Size</Typography>
            <ToggleButtonGroup size="small" color="primary" exclusive value={size} onChange={(_, v) => v && setSize(v)}>
              {[product.size, 'S', 'M', 'L', 'XL'].filter(Boolean).map((s) => (
                <ToggleButton key={s} value={s}>{s}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => addItem({ ...product, variant: { color, size } }, 1)}>Add to Cart</Button>
          <Button variant="outlined">Add to Wishlist</Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>Related Products</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
          {all
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 10)
            .map((rp) => (
              <Card
                key={rp.id}
                sx={{
                  minWidth: 160,
                  maxWidth: 160,
                  flex: '0 0 auto',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
                }}
              >
                <CardMedia
                  component="img"
                  src={getProductImage(rp, { w: 400, h: 300, index: 0 })}
                  alt={rp.title}
                  loading="lazy"
                  onError={(e) => onImgErrorSwap(e, rp, { w: 400, h: 300, index: 0 })}
                  sx={{ height: 120, bgcolor: 'action.hover', objectFit: 'cover', width: '100%' }}
                />
                <CardContent sx={{ py: 1, px: 1 }}>
                  <Typography variant="subtitle2" noWrap sx={{ fontSize: '0.9rem' }}>{rp.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>${rp.price.toFixed(2)}</Typography>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 1, pb: 1 }}>
                  <Button component={Link} to={`/product/${rp.id}`} size="small">View</Button>
                  <Button size="small" onClick={() => addItem(rp, 1)} variant="contained">Add</Button>
                </CardActions>
              </Card>
            ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>Customer Reviews</Typography>
        <ReviewsSection productId={product.id} />
      </Grid>
    </Grid>
  );
}

export default ProductDetailPage;

function ReviewsSection({ productId }) {
  const [reviews, setReviews] = React.useState(() => {
    const seed = (productId % 3) + 1;
    return Array.from({ length: seed }).map((_, i) => ({
      id: `${productId}-${i}`,
      name: `User ${i + 1}`,
      rating: 4 - (i % 2) * 0.5,
      text: 'Great quality and fast shipping. Highly recommended!',
      date: new Date(Date.now() - (i + 1) * 86400000).toLocaleDateString(),
    }));
  });
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState('');

  const avg = reviews.length ? (reviews.reduce((n, r) => n + r.rating, 0) / reviews.length).toFixed(1) : '-';

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setReviews([{ id: `${productId}-${Date.now()}`, name: 'You', rating, text, date: new Date().toLocaleDateString() }, ...reviews]);
    setText('');
    setRating(5);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Rating value={Number(avg)} precision={0.1} readOnly />
        <Typography variant="body2">Average rating: {avg} ({reviews.length} reviews)</Typography>
      </Stack>
      <Box component="form" onSubmit={submit} sx={{ mb: 2 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Add a review</Typography>
          <Rating value={rating} onChange={(_, v) => v && setRating(v)} precision={0.5} />
          <TextField value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your experience" multiline minRows={2} fullWidth />
          <Box>
            <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </Stack>
      </Box>
      <Stack spacing={2}>
        {reviews.map((r) => (
          <Box key={r.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="subtitle2">{r.name}</Typography>
              <Typography variant="caption" color="text.secondary">• {r.date}</Typography>
            </Stack>
            <Rating value={r.rating} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />
            <Typography variant="body2">{r.text}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
