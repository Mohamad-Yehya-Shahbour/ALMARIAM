import { NavLink, Link, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useLang } from './LanguageContext';
import { isAuthenticated, logout } from '../api/apiClient';

const logo = '/assets/images/branding/almaryam-logo-transparent.png';
const brand = '/assets/images/branding/almaryam-brand.png';

export function PublicLayout() {
  const { lang, setLang, tr } = useLang();
  const toggle = () => setLang(lang === 'ar' ? 'en' : 'ar');
  return <>
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand-lockup" to="/"><img src={logo} alt="Al-Mariam" /></Link>
        <nav className="main-nav">
          <NavLink to="/">{tr('home')}</NavLink>
          <NavLink to="/products">{tr('products')}</NavLink>
          <NavLink to="/clients">{tr('clients')}</NavLink>
          <NavLink to="/quotation">{tr('quote')}</NavLink>
          <NavLink to="/about">{tr('about')}</NavLink>
          <NavLink to="/contact">{tr('contact')}</NavLink>
        </nav>
        <button className="lang-button" onClick={toggle}>{tr('language')}</button>
      </div>
    </header>
    <Outlet />
    <footer className="site-footer"><div className="container footer-grid"><img src={logo} alt="Al-Mariam" /><p>Al-Mariam Printing & General Trading — frontend connected to .NET Web API.</p></div></footer>
  </>;
}

export function AdminLayout() {
  const { lang, setLang, tr } = useLang();
  const navigate = useNavigate();
  const toggle = () => setLang(lang === 'ar' ? 'en' : 'ar');
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;
  const signOut = () => { logout(); navigate('/admin/login', { replace:true }); };
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link className="admin-logo" to="/admin"><img src={logo} alt="Al-Mariam" /><span>Admin Portal</span></Link>
      <NavLink to="/admin" end>📊 {tr('dashboard')}</NavLink>
      <NavLink to="/admin/requests">🧾 {tr('requests')}</NavLink>
      <NavLink to="/admin/categories">🏷️ {tr('categories')}</NavLink>
      <NavLink to="/admin/form-builder">🧩 {tr('formBuilder')}</NavLink>
      <NavLink to="/admin/orders">🏭 {tr('orders')}</NavLink>
      <NavLink to="/admin/products">📦 {tr('adminProducts')}</NavLink>
      <NavLink to="/admin/clients">⭐ {tr('adminClients')}</NavLink>
      <NavLink to="/admin/about">ℹ️ {tr('aboutEditor')}</NavLink>
      <NavLink to="/admin/settings">⚙️ {tr('settings')}</NavLink>
      <NavLink to="/admin/users">👤 {tr('users')}</NavLink>
      <NavLink to="/">↩ Website</NavLink>
      <button className="lang-button admin-lang" onClick={toggle}>{tr('language')}</button>
      <button className="lang-button admin-lang logout-btn" onClick={signOut}>{tr('logout')}</button>
    </aside>
    <main className="admin-content"><Outlet /></main>
  </div>;
}

export { brand, logo };
