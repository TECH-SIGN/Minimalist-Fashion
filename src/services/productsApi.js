import { getAllProducts, getFacets as getDynamicFacets } from 'services/productsStore';
import { delay } from 'core/utils/delay';

// Simulated server-side filtering/sorting/pagination
export async function fetchProducts({ q = '', filters = {}, sort = 'relevance', page = 1, pageSize = 12 }) {
  await delay(150);
  const { categories = [], brands = [], price = [0, 100], rating = [] } = filters;
  const productsData = getAllProducts();
  const filtered = productsData
    .filter((p) => p.title.toLowerCase().includes((q || '').toLowerCase()))
    .filter((p) => (categories.length ? categories.includes(p.category) : true))
    .filter((p) => (brands.length ? brands.includes(p.brand) : true))
    .filter((p) => p.price >= price[0] && p.price <= price[1])
    .filter((p) => (rating.length ? rating.some((r) => p.rating >= r) : true));
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });
  const total = sorted.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);
  return { items, total, totalPages };
}

export async function fetchFacets() {
  await delay(100);
  return getDynamicFacets();
}
