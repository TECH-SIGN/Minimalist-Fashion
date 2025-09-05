// Centralized products store backed by localStorage, with static defaults
import baseProducts, { facets as staticFacets } from 'shared/data/products';

const LS_KEY = 'products:custom';

function readCustom() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeCustom(list) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list || []));
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('products:updated'));
    }
  } catch {
    // ignore write errors
  }
}

export function getAllProducts() {
  const custom = readCustom();
  // Custom first, then base (avoid duplicate ids by preferring custom)
  const baseById = new Map(baseProducts.map((p) => [String(p.id), p]));
  const merged = [...custom];
  for (const p of baseProducts) {
    if (!custom.some((c) => String(c.id) === String(p.id))) merged.push(p);
  }
  return merged;
}

export function upsertProduct(product) {
  const list = readCustom();
  const id = product.id ?? Date.now();
  const next = { ...product, id };
  const exists = list.some((p) => String(p.id) === String(id));
  const updated = exists ? list.map((p) => (String(p.id) === String(id) ? next : p)) : [next, ...list];
  writeCustom(updated);
  return next;
}

export function removeProduct(id) {
  const list = readCustom();
  const updated = list.filter((p) => String(p.id) !== String(id));
  writeCustom(updated);
}

export function replaceAllCustomProducts(items) {
  writeCustom(items || []);
}

export function getFacets() {
  // Optionally compute from dynamic data; fallback to static facets for now.
  return staticFacets;
}

export function getAllTitles() {
  return getAllProducts().map((p) => p.title);
}
