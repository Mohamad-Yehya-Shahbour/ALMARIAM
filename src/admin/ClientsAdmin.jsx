import { useEffect, useState } from 'react';
import { api, makeSlug, readFileAsDataUrl } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

const blank = { id:'', name:'', logo:'/assets/images/products/business-cards.jpg', feedback:{en:'', ar:''} };
export default function ClientsAdmin() {
  const { lang, tr } = useLang();
  const [clients, setClients] = useState([]);
  const [editing, setEditing] = useState(null);
  useEffect(() => { api.clients.list().then(setClients).catch(console.error); }, []);
  const open = (c=null) => setEditing(c ? JSON.parse(JSON.stringify(c)) : { ...blank, feedback:{...blank.feedback} });
  const save = async (e) => { e.preventDefault(); const item = { ...editing, id: editing.id || makeSlug(editing.name) }; const saved = clients.some(c => c.id === item.id) ? await api.clients.update(item.id, item) : await api.clients.create(item); setClients(clients.some(c => c.id === saved.id) ? clients.map(c => c.id === saved.id ? saved : c) : [saved, ...clients]); setEditing(null); };
  const remove = async (id) => { await api.clients.remove(id); setClients(clients.filter(c => c.id !== id)); };
  const file = async (f) => { if (!f) return; const data = await readFileAsDataUrl(f); setEditing({ ...editing, logo:data.dataUrl }); };
  return <div><div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('adminClients')}</h1><p>Add client feedback and logo shown on the public Clients page.</p></div><button className="btn primary" onClick={() => open()}>+ Add client</button></div><div className="table-card"><table><thead><tr><th>Logo</th><th>Name</th><th>Feedback</th><th>{tr('actions')}</th></tr></thead><tbody>{clients.map(c => <tr key={c.id}><td><img className="thumb" src={c.logo}/></td><td><b>{c.name}</b></td><td>{c.feedback?.[lang]}</td><td><button className="btn light" onClick={() => open(c)}>Edit</button> <button className="btn light danger-text" onClick={() => remove(c.id)}>Delete</button></td></tr>)}</tbody></table></div>{editing && <div className="modal-backdrop" onMouseDown={() => setEditing(null)}><form className="modal-card modal-clean" onMouseDown={e => e.stopPropagation()} onSubmit={save}><div className="modal-head"><h2>{editing.id ? 'Edit client' : 'Add client'}</h2><button className="icon-btn" type="button" onClick={() => setEditing(null)}>×</button></div><div className="form-grid"><div className="form-field"><label>Client name*</label><input required value={editing.name} onChange={e => setEditing({...editing, name:e.target.value})}/></div><div className="form-field"><label>Logo image</label><input type="file" accept="image/*" onChange={e => file(e.target.files?.[0])}/></div><div className="form-field full"><label>Feedback EN</label><textarea value={editing.feedback.en} onChange={e => setEditing({...editing, feedback:{...editing.feedback,en:e.target.value}})}/></div><div className="form-field full"><label>Feedback AR</label><textarea value={editing.feedback.ar} onChange={e => setEditing({...editing, feedback:{...editing.feedback,ar:e.target.value}})}/></div></div><button className="btn primary" type="submit">{tr('save')}</button></form></div>}</div>;
}
