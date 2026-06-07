import { defaultForms, defaultRequests, defaultProducts, defaultCategories, defaultUsers, defaultAbout, defaultClients } from '../data/defaults';

const FORMS_KEY = 'almariam_category_forms_vite';
const REQUESTS_KEY = 'almariam_quote_requests_vite';
const PRODUCTS_KEY = 'almariam_products_vite';
const CATEGORIES_KEY = 'almariam_categories_vite';
const USERS_KEY = 'almariam_users_vite';
const ABOUT_KEY = 'almariam_about_vite';
const CLIENTS_KEY = 'almariam_clients_vite';
const AUTH_KEY = 'almariam_admin_token_vite';

const clone = (x) => JSON.parse(JSON.stringify(x));
const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || clone(fallback); } catch { return clone(fallback); } };
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const getForms = () => get(FORMS_KEY, defaultForms);
export const saveForms = (forms) => save(FORMS_KEY, forms);
export function resetForms() { saveForms(clone(defaultForms)); return clone(defaultForms); }
export const getRequests = () => get(REQUESTS_KEY, defaultRequests);
export const saveRequests = (requests) => save(REQUESTS_KEY, requests);
export function addRequest(request) { const next = [request, ...getRequests()]; saveRequests(next); return next; }
export function updateRequest(id, patch) { const next = getRequests().map((r) => r.id === id ? { ...r, ...patch } : r); saveRequests(next); return next; }
export const getProducts = () => get(PRODUCTS_KEY, defaultProducts);
export const saveProducts = (products) => save(PRODUCTS_KEY, products);
export const getCategories = () => get(CATEGORIES_KEY, defaultCategories);
export const saveCategories = (categories) => save(CATEGORIES_KEY, categories);
export const getUsers = () => get(USERS_KEY, defaultUsers);
export const saveUsers = (users) => save(USERS_KEY, users);
export const getAbout = () => get(ABOUT_KEY, defaultAbout);
export const saveAbout = (about) => save(ABOUT_KEY, about);
export const getClients = () => get(CLIENTS_KEY, defaultClients);
export const saveClients = (clients) => save(CLIENTS_KEY, clients);
export function login(username = 'admin') { const token = `fake-jwt-${Date.now()}`; localStorage.setItem(AUTH_KEY, JSON.stringify({ token, username })); return token; }
export function logout() { localStorage.removeItem(AUTH_KEY); }
export function getAuth() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; } }
export function isAuthenticated() { return !!getAuth()?.token; }
export function makeRef() { const number = Math.floor(3000 + Math.random() * 6000); return `QT-${number}`; }
export function makeSlug(text) { return (text || 'item').toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `item-${Date.now()}`; }
export function readFileAsDataUrl(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, dataUrl: reader.result }); reader.onerror = reject; reader.readAsDataURL(file); }); }
