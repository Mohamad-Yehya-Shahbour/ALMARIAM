const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'https://localhost:7001/api' : '/api');
  const AUTH_KEY = 'almariam_admin_token_vite';

function authHeader() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_KEY));
    return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
  } catch { return {}; }
}

async function request(path, options = {}) {
  const headers = { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...authHeader(), ...(options.headers || {}) };
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(data?.message || data?.title || response.statusText || 'Request failed');
  return data;
}

export const api = {
  auth: { login: (payload) => request('/auth/login', { method:'POST', body:JSON.stringify(payload) }) },
  categories: {
    list: () => request('/categories'),
    create: (x) => request('/categories', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/categories/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) }),
    remove: (id) => request(`/categories/${encodeURIComponent(id)}`, { method:'DELETE' })
  },
  products: {
    list: () => request('/products'),
    create: (x) => request('/products', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/products/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) }),
    remove: (id) => request(`/products/${encodeURIComponent(id)}`, { method:'DELETE' })
  },
  forms: {
    list: () => request('/forms'),
    update: (id, x) => request(`/forms/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) }),
    reset: () => request('/forms/reset', { method:'POST' })
  },
  requests: {
    list: () => request('/quote-requests'),
    create: (x) => request('/quote-requests', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/quote-requests/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) })
  },
  users: {
    list: () => request('/users'),
    create: (x) => request('/users', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/users/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) }),
    remove: (id) => request(`/users/${encodeURIComponent(id)}`, { method:'DELETE' })
  },
  about: {
    get: () => request('/about'),
    update: (x) => request('/about', { method:'PUT', body:JSON.stringify(x) })
  },
  clients: {
    list: () => request('/clients'),
    create: (x) => request('/clients', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/clients/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) }),
    remove: (id) => request(`/clients/${encodeURIComponent(id)}`, { method:'DELETE' })
  },
  orders: {
    list: () => request('/orders'),
    create: (x) => request('/orders', { method:'POST', body:JSON.stringify(x) }),
    update: (id, x) => request(`/orders/${encodeURIComponent(id)}`, { method:'PUT', body:JSON.stringify(x) })
  },
  settings: {
    get: () => request('/settings'),
    update: (x) => request('/settings', { method:'PUT', body:JSON.stringify(x) })
  }
};

export function saveAuth(auth) { localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); }
export function getAuth() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } }
export function logout() { localStorage.removeItem(AUTH_KEY); }
export function isAuthenticated() { return !!getAuth()?.token; }
export function makeSlug(text) { return (text || 'item').toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `item-${Date.now()}`; }
export function makeRef() { const d = new Date(); const dd = String(d.getDate()).padStart(2,'0'); const mm = String(d.getMonth()+1).padStart(2,'0'); const yyyy = d.getFullYear(); const number = Math.floor(1 + Math.random() * 999); return `QT-${dd}${mm}${yyyy}-${String(number).padStart(3,'0')}`; }
export function makeOrderRef(existing = []) { const d = new Date(); const dd = String(d.getDate()).padStart(2,'0'); const mm = String(d.getMonth()+1).padStart(2,'0'); const yyyy = d.getFullYear(); const prefix = `OR-${dd}${mm}${yyyy}-`; const count = existing.filter(o => o.ref?.startsWith(prefix)).length + 1; return `${prefix}${String(count).padStart(3,'0')}`; }
export function readFileAsDataUrl(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, dataUrl: reader.result }); reader.onerror = reject; reader.readAsDataURL(file); }); }
