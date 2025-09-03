import productsData, { facets as staticFacets } from 'shared/data/products';
import { delay } from 'core/utils/delay';
import { httpGet } from 'services/http/client';

// Simulated server-side filtering/sorting/pagination
export async function fetchProducts({ q = '', filters = {}, sort = 'relevance', page = 1, pageSize = 12 }) {
  // Try HTTP (MSW) first
  try {
    const { categories = [], brands = [], price = [0, 100], rating = [] } = filters;
    const params = {
      q,
      sort,
      page,
      pageSize,
      priceMin: price[0],
      priceMax: price[1],
    };
    // arrays as repeated params are handled by client
    const res = await httpGet('/products', { params: { ...params, categories, brands, rating } });
    return res;
  } catch (e) {
    // Fallback to local filtering if HTTP not available
    await delay(350);
    const { categories = [], brands = [], price = [0, 100], rating = [] } = filters;
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
}

export async function fetchFacets() {
  try {
    const res = await httpGet('/products/facets');
    return res;
  } catch (e) {
    await delay(150);
    return staticFacets;
  }
}
