import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCart } from 'state/CartContext';
import { useWishlist } from 'state/WishlistContext';
import { useColorMode } from 'theme';
import { useNavigate, Link } from 'react-router-dom';
import { useUI } from 'state/UIContext';
import { fetchSearchSuggestions, saveRecentSearch } from 'services/searchApi';

function Header() {
  const { items } = useCart();
  const { items: wish } = useWishlist();
  const { toggleColorMode, mode } = useColorMode();
  const navigate = useNavigate();
  const { setMiniCartOpen } = useUI();

  const [q, setQ] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const goSearch = (query) => {
    const val = (query || '').trim();
    if (!val) return;
    saveRecentSearch(val);
    navigate(`/products?q=${encodeURIComponent(val)}`);
  };

  React.useEffect(() => {
    let ignore = false;
    const t = setTimeout(() => {
      fetchSearchSuggestions(q).then(({ suggestions, popular }) => {
        if (ignore) return;
        setOptions(suggestions.length ? suggestions : popular);
      });
    }, 200);
    return () => { ignore = true; clearTimeout(t); };
  }, [q]);

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography component={Link} to="/" variant="h6" color="inherit" sx={{ textDecoration: 'none' }}>E-Shop</Typography>
        <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' } }}>
          <Autocomplete
            freeSolo
            options={options}
            inputValue={q}
            onInputChange={(_, v) => setQ(v)}
            onChange={(_, val) => val && goSearch(val)}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search products..."
                size="small"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    goSearch(q);
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: (t) => alpha(t.palette.common.white, 0.15),
                    '&:hover': { backgroundColor: (t) => alpha(t.palette.common.white, 0.25) },
                    '& fieldset': { borderColor: 'transparent' },
                    color: 'inherit',
                  },
                }}
              />
            )}
          />
        </Box>
        <Button color="inherit" component={Link} to="/login">Sign in</Button>
        <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle theme">
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton color="inherit" component={Link} to="/wishlist" aria-label="wishlist">
          <Badge badgeContent={wish.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" aria-label="cart" onClick={() => setMiniCartOpen(true)}>
          <Badge badgeContent={items.reduce((n, i) => n + i.qty, 0)} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
