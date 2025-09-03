import { http, HttpResponse, delay } from 'msw';
import productsData, { facets as staticFacets } from 'shared/data/products';

function filterSortPaginate({ q = '', filters = {}, sort = 'relevance', page = 1, pageSize = 12 }) {
  const { categories = [], brands = [], price = [0, 100], rating = [] } = filters;
  const filtered = productsData
    .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
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

export const handlers = [
  http.get('/products', async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q') || '';
    const sort = url.searchParams.get('sort') || 'relevance';
    const page = Number(url.searchParams.get('page') || '1');
    const pageSize = Number(url.searchParams.get('pageSize') || '12');
    const categories = url.searchParams.getAll('categories');
    const brands = url.searchParams.getAll('brands');
    const priceMin = Number(url.searchParams.get('priceMin') || '0');
    const priceMax = Number(url.searchParams.get('priceMax') || '100');
    const rating = url.searchParams.getAll('rating').map((r) => Number(r));

    const { items, total, totalPages } = filterSortPaginate({
      q,
      sort,
      page,
      pageSize,
      filters: { categories, brands, price: [priceMin, priceMax], rating },
    });
    await delay(300);
    return HttpResponse.json({ items, total, totalPages }, { status: 200 });
  }),

  http.get('/products/facets', async () => {
    await delay(150);
    return HttpResponse.json(staticFacets, { status: 200 });
  }),

  http.get('/search', async ({ request }) => {
    const url = new URL(request.url);
    const q = (url.searchParams.get('q') || '').toLowerCase().trim();
    const titles = productsData.map((p) => p.title);
    let suggestions = [];
    if (q) {
      const starts = titles.filter((t) => t.toLowerCase().startsWith(q));
      const includes = titles.filter((t) => t.toLowerCase().includes(q) && !starts.includes(t));
      suggestions = [...starts, ...includes].slice(0, 8);
    } else {
      suggestions = titles.slice(0, 6);
    }
    await delay(150);
    return HttpResponse.json({ suggestions }, { status: 200 });
  }),
];
