import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLang } from '../components/LanguageContext';
import { api } from '../api/apiClient';
import { logo } from '../components/Layouts';

export default function Home() {
  const { tr, lang } = useLang();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => { Promise.all([api.products.list(), api.categories.list()]).then(([p,c]) => { setProducts(p); setCategories(c); }).catch(console.error); }, []);
  return <>
    <section className="hero">
      <div className="hero-overlay" />
      <div className="container hero-grid">
        <div className="hero-card-logo"><img src={logo} alt="Al-Mariam" /></div>
        <div className="hero-copy">
          <h1>{tr('heroTitle')}</h1>
          <p>{tr('heroText')}</p>
          <div className="hero-actions"><Link className="btn primary" to="/quotation">{tr('quoteNow')}</Link><Link className="btn light" to="/products">{tr('browse')}</Link></div>
          <div className="stats"><div><b>+18</b><span>Products</span></div><div><b>4</b><span>Dynamic forms</span></div><div><b>2</b><span>Admin pages</span></div></div>
        </div>
      </div>
    </section>
    <section className="container section">
      <div className="section-head"><span className="eyebrow">Products</span><h2>Popular quotation categories</h2></div>
      <div className="product-grid">{products.slice(0,6).map(p => { const c = categories.find(x => x.id === p.categoryId); return <Link className="product-card" to={`/quotation?product=${p.id}`} key={p.id}><img src={p.image} /><div><span>{c?.name?.[lang]}</span><h3>{p.name?.[lang]}</h3><p>{p.desc?.[lang]}</p></div></Link>; })}</div>
    </section>
  </>;
}
