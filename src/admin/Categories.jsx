import { useEffect, useState } from 'react';
import { api, makeSlug } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

const parseSteps = (value) => Array.isArray(value) ? value : String(value || '').split('\n').map(x => x.trim()).filter(Boolean);
const stepsText = (steps) => (steps || []).join('\n');

export default function Categories() {
  const { tr } = useLang();
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  useEffect(() => { api.categories.list().then(setCategories).catch(console.error); }, []);
  const open = (c=null) => setEditing(c ? { ...JSON.parse(JSON.stringify(c)), stepsText: stepsText(c.steps) } : { id:'', name:{en:'', ar:''}, steps:[], stepsText:'' });
  const save = async (e) => {
    e.preventDefault();
    const item = { ...editing, id: editing.id || makeSlug(editing.name.en), steps: parseSteps(editing.stepsText) };
    delete item.stepsText;
    const saved = categories.some(c => c.id === item.id) ? await api.categories.update(item.id, item) : await api.categories.create(item);
    setCategories(categories.some(c => c.id === saved.id) ? categories.map(c => c.id === saved.id ? saved : c) : [saved, ...categories]);
    setEditing(null);
  };
  const remove = async (id) => { await api.categories.remove(id); setCategories(categories.filter(c => c.id !== id)); };
  return <div><div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('categories')}</h1><p>Add categories and add the extra production steps for each one. Fixed steps are always: Editing, CTP, Printing.</p></div><button className="btn primary" onClick={() => open()}>+ Add category</button></div>
    <div className="table-card"><table><thead><tr><th>English</th><th>Arabic</th><th>ID</th><th>Extra steps</th><th>{tr('actions')}</th></tr></thead><tbody>{categories.map(c => <tr key={c.id}><td>{c.name.en}</td><td>{c.name.ar}</td><td>{c.id}</td><td>{(c.steps || []).join(', ') || '-'}</td><td><button className="btn light" onClick={() => open(c)}>Edit</button> <button className="btn light danger-text" onClick={() => remove(c.id)}>Delete</button></td></tr>)}</tbody></table></div>
    {editing && <div className="modal-backdrop" onMouseDown={() => setEditing(null)}><form className="modal-card modal-clean" onMouseDown={e => e.stopPropagation()} onSubmit={save}><div className="modal-head"><h2>{editing.id ? 'Edit category' : 'Add category'}</h2><button className="icon-btn" type="button" onClick={() => setEditing(null)}>×</button></div><div className="modal-body"><div className="form-grid"><div className="form-field"><label>Name EN*</label><input required value={editing.name.en} onChange={e => setEditing({...editing, name:{...editing.name,en:e.target.value}})} /></div><div className="form-field"><label>Name AR</label><input value={editing.name.ar} onChange={e => setEditing({...editing, name:{...editing.name,ar:e.target.value}})} /></div><div className="form-field full"><label>Extra production steps</label><textarea rows="5" placeholder={'One step per line\nFolding\nCutting\nCellophane\nCoverage\nPackaging'} value={editing.stepsText} onChange={e => setEditing({...editing, stepsText:e.target.value})} /><small className="muted">These steps will be added after Editing → CTP → Printing when an order is created.</small></div></div><button className="btn primary" type="submit">{tr('save')}</button></div></form></div>}
  </div>;
}
