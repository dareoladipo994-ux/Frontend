const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function apiFetch(path, opts = {}) {
  const url = API + path;
  const init = { headers: {'Content-Type':'application/json'}, ...opts };
  if (opts.body && typeof opts.body !== 'string') init.body = JSON.stringify(opts.body);
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API error');
  }
  return res.json();
}
