import { Navigate, Route, Routes } from 'react-router-dom';
import { PublicLayout, AdminLayout } from './components/Layouts';
import Home from './pages/Home';
import Products from './pages/Products';
import Quotation from './pages/Quotation';
import { About, Contact, Clients } from './pages/SimplePages';
import Dashboard from './admin/Dashboard';
import Requests from './admin/Requests';
import FormBuilder from './admin/FormBuilder';
import Login from './admin/Login';
import ProductsAdmin from './admin/ProductsAdmin';
import Categories from './admin/Categories';
import Users from './admin/Users';
import AboutEditor from './admin/AboutEditor';
import ClientsAdmin from './admin/ClientsAdmin';
import Orders from './admin/Orders';
import Settings from './admin/Settings';

export default function App() {
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/quotation" element={<Quotation />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="requests" element={<Requests />} />
      <Route path="categories" element={<Categories />} />
      <Route path="form-builder" element={<FormBuilder />} />
      <Route path="orders" element={<Orders />} />
      <Route path="products" element={<ProductsAdmin />} />
      <Route path="clients" element={<ClientsAdmin />} />
      <Route path="about" element={<AboutEditor />} />
      <Route path="settings" element={<Settings />} />
      <Route path="users" element={<Users />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
