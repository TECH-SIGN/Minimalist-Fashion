import { getAllTitles as getDynamicTitles } from 'services/productsStore';
import { delay } from 'core/utils/delay';
import { httpGet } from 'services/http/client';

const RECENT_KEY = 'recent-searches';

function getAllTitles() { return getDynamicTitles(); }

export function getRecentSearches(limit = 6) {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.slice(0, limit) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(q) {
  if (!q) return;
  try {
    const arr = getRecentSearches(20);
    const existing = arr.filter((x) => x.toLowerCase() !== q.toLowerCase());
    const updated = [q, ...existing].slice(0, 20);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export async function fetchSearchSuggestions(q, limit = 8) {
  try {
    const res = await httpGet('/search', { params: { q, limit } });
    const titles = getAllTitles();
    return { suggestions: res.suggestions || [], popular: titles.slice(0, 6) };
  } catch (e) {
    // fallback
    await delay(150);
    const lower = (q || '').toLowerCase().trim();
    const titles = getAllTitles();
    if (!lower) {
      return { suggestions: getRecentSearches(limit), popular: titles.slice(0, 6) };
    }
    const starts = titles.filter((t) => t.toLowerCase().startsWith(lower));
    const includes = titles.filter((t) => t.toLowerCase().includes(lower) && !starts.includes(t));
    const suggestions = [...starts, ...includes].slice(0, limit);
    return { suggestions, popular: titles.slice(0, 6) };
  }
}
