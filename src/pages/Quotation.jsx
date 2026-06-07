import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, makeRef, readFileAsDataUrl } from '../api/apiClient';
import { FieldRenderer } from '../components/FieldRenderer';
import { useLang } from '../components/LanguageContext';

export default function Quotation() {
  const { lang, tr } = useLang();
  const [params] = useSearchParams();
  const [forms, setForms] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState('');
  const selectedProduct = products.find(p => p.id === productId) || products[0];
  const form = forms.find(f => f.id === selectedProduct?.categoryId) || forms[0];
  const category = categories.find(c => c.id === selectedProduct?.categoryId);
  const [customer, setCustomer] = useState({ name:'', phone:'', email:'' });
  const [values, setValues] = useState({});
  const [saved, setSaved] = useState(null);
  useEffect(() => { Promise.all([api.forms.list(), api.products.list(), api.categories.list()]).then(([f,p,c]) => { setForms(f); setProducts(p); setCategories(c); const wanted = p.find(x => x.id === params.get('product')) || p[0]; setProductId(wanted?.id || ''); }).catch(console.error); }, [params]);
  useEffect(() => { setValues({}); setSaved(null); }, [form?.id, productId]);
  const handleValueChange = async (key, value, kind) => {
    if (kind === 'file' && value) { const fileData = await readFileAsDataUrl(value); setValues(v => ({ ...v, [key]: fileData })); return; }
    setValues(v => ({ ...v, [key]: value }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const request = { id: crypto.randomUUID(), ref: makeRef(), status:'New', createdAt: new Date().toISOString(), customer, productId: selectedProduct.id, productName: selectedProduct.name.en, categoryId: form.id, categoryTitle: form.title || category?.name, fieldsSnapshot: form.fields, values };
    const savedReq = await api.requests.create(request);
    setSaved(savedReq.ref); setCustomer({ name:'', phone:'', email:'' }); setValues({});
  };
  if (!selectedProduct || !form) return <section className="container section page-top"><div className="simple-card">Loading...</div></section>;
  return <section className="container section page-top">
    <div className="section-head"><span className="eyebrow">Quotation</span><h1>{tr('quote')}</h1><p>Dynamic fields change based on selected product/category and are saved through the .NET API.</p></div>
    {saved && <div className="success-box">{tr('success')} Reference: <b>{saved}</b></div>}
    <form className="quote-shell" onSubmit={onSubmit}>
      <div className="form-card"><h2>{tr('clientInfo')}</h2><div className="form-grid"><div className="form-field"><label>Name*</label><input required value={customer.name} onChange={e => setCustomer({...customer, name:e.target.value})} /></div><div className="form-field"><label>Phone*</label><input required value={customer.phone} onChange={e => setCustomer({...customer, phone:e.target.value})} /></div><div className="form-field"><label>Email</label><input type="email" value={customer.email} onChange={e => setCustomer({...customer, email:e.target.value})} /></div><div className="form-field"><label>{tr('chooseProduct')}</label><select value={productId} onChange={e => setProductId(e.target.value)}>{products.map(p => { const c = categories.find(x => x.id === p.categoryId); return <option key={p.id} value={p.id}>{p.name?.[lang]} — {c?.name?.[lang]}</option>; })}</select></div></div></div>
      <div className="form-card"><h2>{form.title?.[lang] || form.title?.en || category?.name?.[lang]}</h2><div className="form-grid">{form.fields.map(field => <FieldRenderer key={field.key} field={field} value={values[field.key]} onChange={handleValueChange} />)}</div></div>
      <button className="btn primary big" type="submit">{tr('submit')}</button>
    </form>
  </section>;
}
