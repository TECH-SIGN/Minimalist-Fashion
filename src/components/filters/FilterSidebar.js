import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function FilterSidebar({ open, onClose, filters, setFilters, available }) {
  const [search, setSearch] = React.useState('');

  const toggleMulti = (key, value) => {
    setFilters((f) => {
      const set = new Set(f[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...f, [key]: Array.from(set) };
    });
  };

  const clearAll = () => setFilters({ categories: [], brands: [], price: [0, 100], rating: [], color: [], size: [] });

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }} role="presentation">
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
          {(filters.categories || []).map((v) => (<Chip key={v} label={v} onDelete={() => toggleMulti('categories', v)} />))}
          {(filters.brands || []).map((v) => (<Chip key={v} label={v} onDelete={() => toggleMulti('brands', v)} />))}
          {(filters.rating || []).map((v) => (<Chip key={v} label={`★ ${v}+`} onDelete={() => toggleMulti('rating', v)} />))}
          {(filters.color || []).map((v) => (<Chip key={v} label={v} onDelete={() => toggleMulti('color', v)} />))}
          {(filters.size || []).map((v) => (<Chip key={v} label={v} onDelete={() => toggleMulti('size', v)} />))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button onClick={clearAll}>Clear All</Button>
        </Stack>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Categories</AccordionSummary>
          <AccordionDetails>
            <TextField size="small" fullWidth placeholder="Search categories" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: 1 }} />
            {available.categories
              .filter((c) => c.toLowerCase().includes(search.toLowerCase()))
              .map((c) => (
                <FormControlLabel key={c} control={<Checkbox checked={filters.categories.includes(c)} onChange={() => toggleMulti('categories', c)} />} label={c} />
              ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Brands</AccordionSummary>
          <AccordionDetails>
            {available.brands.map((b) => (
              <FormControlLabel key={b} control={<Checkbox checked={filters.brands.includes(b)} onChange={() => toggleMulti('brands', b)} />} label={b} />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Price</AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>${filters.price[0]} - ${filters.price[1]}</Typography>
            <Slider value={filters.price} onChange={(_, v) => setFilters((f) => ({ ...f, price: v }))} valueLabelDisplay="auto" min={0} max={100} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>Rating</AccordionSummary>
          <AccordionDetails>
            {[4, 3, 2, 1].map((r) => (
              <FormControlLabel key={r} control={<Checkbox checked={filters.rating.includes(r)} onChange={() => toggleMulti('rating', r)} />} label={`★ ${r}+`} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
}
