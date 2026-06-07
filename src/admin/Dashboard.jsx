import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function Dashboard() {
  const { tr } = useLang();
  const [requests, setRequests] = useState([]);
  useEffect(() => { api.requests.list().then(setRequests).catch(console.error); }, []);
  const count = s => requests.filter(r => r.status === s).length;
  return <div>
    <div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('dashboard')}</h1><p>Frontend is connected to the .NET Web API. Data is seeded for testing and persisted in the database.</p></div><Link className="btn primary" to="/admin/requests">{tr('requests')}</Link></div>
    <div className="admin-stats"><div><b>{requests.length}</b><span>Total requests</span></div><div><b>{count('New')}</b><span>New</span></div><div><b>{count('In Review')}</b><span>In review</span></div><div><b>{count('Done')}</b><span>Done</span></div></div>
    <div className="table-card"><div className="table-head"><h2>Latest requests</h2><Link className="mini-link" to="/admin/requests">View all</Link></div><table><thead><tr><th>Ref</th><th>{tr('customer')}</th><th>{tr('product')}</th><th>{tr('status')}</th></tr></thead><tbody>{requests.slice(0,6).map(r => <tr key={r.id}><td>{r.ref}</td><td>{r.customer?.name}</td><td>{r.productName}</td><td><span className={`badge ${r.status.replace(' ','').toLowerCase()}`}>{r.status}</span></td></tr>)}</tbody></table></div>
  </div>;
}
