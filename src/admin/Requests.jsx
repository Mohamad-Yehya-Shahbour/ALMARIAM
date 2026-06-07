import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/apiClient';
import RequestDetailsModal from '../components/RequestDetailsModal';
import { useLang } from '../components/LanguageContext';

export default function Requests() {
  const { tr } = useLang();
  const [requests, setRequests] = useState([]);
  const [forms, setForms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  useEffect(() => { Promise.all([api.requests.list(), api.forms.list()]).then(([r,f]) => { setRequests(r); setForms(f); }).catch(console.error); }, []);
  const visible = useMemo(() => filter === 'All' ? requests : requests.filter(r => r.status === filter), [requests, filter]);
  const selectedFields = selected?.fieldsSnapshot || forms.find(f => f.id === selected?.categoryId)?.fields || [];
  const changeStatus = async (id, status, patch = {}) => {
    const updated = await api.requests.update(id, { ...patch, status });
    const next = requests.map(r => r.id === id ? updated : r);
    setRequests(next);
    setSelected(updated);
    return updated;
  };
  const updateSelected = (updated) => {
    if (!updated) return;
    setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSelected(updated);
  };
  return <div>
    <div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('requests')}</h1><p>Click any row to preview the values filled by the client and download uploaded files.</p></div></div>
    <div className="filters">{['All','New','In Review','Done'].map(s => <button key={s} onClick={() => setFilter(s)} className={filter===s?'active':''}>{s}</button>)}</div>
    <div className="table-card"><table className="click-table"><thead><tr><th>Ref</th><th>{tr('customer')}</th><th>{tr('product')}</th><th>{tr('date')}</th><th>{tr('status')}</th></tr></thead><tbody>{visible.map(r => <tr key={r.id} onClick={() => setSelected(r)}><td><b>{r.ref}</b></td><td>{r.customer?.name}</td><td>{r.productName}</td><td>{new Date(r.createdAt).toLocaleDateString()}</td><td><span className={`badge ${r.status.replace(' ','').toLowerCase()}`}>{r.status}</span></td></tr>)}</tbody></table></div>
    <RequestDetailsModal request={selected} fields={selectedFields} onClose={() => setSelected(null)} onStatusChange={changeStatus} onRequestUpdated={updateSelected} />
  </div>;
}
