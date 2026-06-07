import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function Products() {
  const { lang, tr } = useLang();
  const [term, setTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => { Promise.all([api.categories.list(), api.products.list()]).then(([c,p]) => { setCategories(c); setProducts(p); }).catch(console.error); }, []);
  const list = useMemo(() => products.filter(p => {
    const cat = categories.find(c => c.id === p.categoryId);
    return `${p.name?.en} ${p.name?.ar} ${p.desc?.en} ${p.desc?.ar} ${cat?.name?.en} ${cat?.name?.ar}`.toLowerCase().includes(term.toLowerCase());
  }), [term, products, categories]);
  return <section className="container section page-top">
    <div className="section-head"><span className="eyebrow">Al-Mariam</span><h1>{tr('products')}</h1><p>Products are managed from the admin portal and used in quotation requests.</p></div>
    <input className="search" value={term} onChange={e => setTerm(e.target.value)} placeholder="Search products..." />
    <div className="product-grid mt24">{list.map(p => { const cat = categories.find(c => c.id === p.categoryId); return <div className="product-card" key={p.id}><img src={p.image} /><div><span>{cat?.name?.[lang]}</span><h3>{p.name?.[lang]}</h3><p>{p.desc?.[lang]}</p><Link className="mini-link" to={`/quotation?product=${p.id}`}>{tr('quote')}</Link></div></div>; })}</div>
  </section>;
}
