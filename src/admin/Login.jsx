import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, saveAuth } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function Login() {
  const { tr } = useLang();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:'admin', password:'admin123' });
  const [error, setError] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const auth = await api.auth.login(form);
      saveAuth(auth);
      navigate('/admin', { replace:true });
    } catch (err) { setError(err.message); }
  };
  return <section className="login-page"><form className="login-card" onSubmit={submit}><img src="/assets/images/branding/almaryam-logo-transparent.png" alt="Al-Mariam"/><h1>{tr('login')}</h1><p>Use admin / admin123 for the seeded test user.</p>{error && <div className="error-box">{error}</div>}<input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="Username"/><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password"/><button className="btn primary big" type="submit">{tr('login')}</button></form></section>;
}
