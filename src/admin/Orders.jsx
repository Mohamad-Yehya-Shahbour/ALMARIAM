import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function Orders() {
  const { tr } = useLang();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => { api.orders.list().then(setOrders).catch(console.error); }, []);
  const updateStep = async (index, status) => {
    const steps = selected.steps.map((s, i) => i === index ? { ...s, status, completedAt: status === 'Done' ? new Date().toISOString() : null } : s);
    const nextStatus = steps.every(s => s.status === 'Done') ? 'Done' : 'In Progress';
    const updated = await api.orders.update(selected.id, { ...selected, steps, status: nextStatus });
    setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
    setSelected(updated);
  };
  return <div>
    <div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('orders')}</h1><p>Track orders manually through the fixed and category-specific steps.</p></div></div>
    <div className="table-card"><table className="click-table"><thead><tr><th>Order</th><th>Quote</th><th>Customer</th><th>Product</th><th>Price</th><th>Status</th></tr></thead><tbody>{orders.map(o => <tr key={o.id} onClick={() => setSelected(o)}><td><b>{o.ref}</b></td><td>{o.quoteRef}</td><td>{o.customer?.name}</td><td>{o.productName}</td><td>{o.price}</td><td><span className={`badge ${String(o.status).replace(' ','').toLowerCase()}`}>{o.status}</span></td></tr>)}</tbody></table></div>
    {selected && <div className="modal-backdrop" onMouseDown={() => setSelected(null)}><div className="modal-card" onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">{selected.ref}</span><h2>Order tracking</h2></div><button className="icon-btn" onClick={() => setSelected(null)}>×</button></div><div className="modal-body"><div className="detail-grid"><div className="detail-line"><span>Customer</span><strong>{selected.customer?.name}</strong></div><div className="detail-line"><span>Phone</span><strong>{selected.customer?.phone}</strong></div><div className="detail-line"><span>Quote</span><strong>{selected.quoteRef}</strong></div><div className="detail-line"><span>Price</span><strong>{selected.price}</strong></div></div><h3 className="section-title">Production steps</h3><div className="steps-list">{(selected.steps || []).map((step, i) => <div className="step-row" key={`${step.name}-${i}`}><div><b>{i + 1}. {step.name}</b><span>{step.completedAt ? new Date(step.completedAt).toLocaleString() : 'Not completed yet'}</span></div><select value={step.status} onChange={e => updateStep(i, e.target.value)}><option>Pending</option><option>In Progress</option><option>Done</option></select></div>)}</div></div></div></div>}
  </div>;
}
