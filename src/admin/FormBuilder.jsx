import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { FieldRenderer } from '../components/FieldRenderer';
import { useLang } from '../components/LanguageContext';

const emptyField = { key:'', label:{en:'', ar:''}, type:'string', required:true, options:[] };
const types = ['string','int','date','select','checkbox','textarea','file'];
const slug = (v) => (v || 'field').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'') || 'field';

export default function FormBuilder() {
  const { lang, tr } = useLang();
  const [forms, setForms] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [field, setField] = useState(emptyField);
  useEffect(() => { api.forms.list().then(d => { setForms(d); setCategoryId(d[0]?.id || ''); }).catch(console.error); }, []);
  const form = forms.find(f => f.id === categoryId) || forms[0];
  const startAdd = () => { setEditIndex(null); setField(emptyField); };
  const startEdit = (idx) => { setEditIndex(idx); setField(JSON.parse(JSON.stringify(form.fields[idx]))); };
  const persistForm = async (updatedForm) => {
    const saved = await api.forms.update(updatedForm.id, updatedForm);
    setForms(forms.map(f => f.id === saved.id ? saved : f));
  };
  const saveField = async (e) => {
    e.preventDefault();
    const nextField = { ...field, key: field.key || slug(field.label.en), options: typeof field.options === 'string' ? field.options.split(',').map(x => x.trim()).filter(Boolean) : field.options };
    const fields = editIndex === null ? [...form.fields, nextField] : form.fields.map((old, i) => i === editIndex ? nextField : old);
    await persistForm({ ...form, fields });
    startAdd();
  };
  const remove = async (idx) => persistForm({ ...form, fields: form.fields.filter((_, i) => i !== idx) });
  const move = async (idx, dir) => {
    const arr = [...form.fields]; const to = idx + dir;
    if (to < 0 || to >= arr.length) return;
    [arr[idx], arr[to]] = [arr[to], arr[idx]];
    await persistForm({ ...form, fields: arr });
  };
  const reset = async () => { const d = await api.forms.reset(); setForms(d); setCategoryId(d[0]?.id || ''); startAdd(); };
  if (!form) return <div className="admin-top"><h1>{tr('formBuilder')}</h1></div>;

  return <div>
    <div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('formBuilder')}</h1><p>Build the public form per category. Select fields have custom options and checkbox type is included.</p></div><button className="btn light" onClick={reset}>{tr('reset')}</button></div>
    <div className="builder-layout">
      <aside className="builder-side table-card"><h2>Categories</h2>{forms.map(f => <button key={f.id} className={f.id===categoryId?'active':''} onClick={() => {setCategoryId(f.id); startAdd();}}><b>{f.title?.[lang] || f.title?.en}</b><span>{f.fields.length} fields</span></button>)}</aside>
      <section className="builder-main">
        <div className="table-card"><div className="table-head"><h2>{form.title?.[lang] || form.title?.en}</h2><button className="btn primary" onClick={startAdd}>+ {tr('addField')}</button></div>
          <div className="field-list">{form.fields.map((f, i) => <div className="field-row" key={`${f.key}-${i}`}><div><b>{f.label?.[lang] || f.label?.en}</b><span>{f.type}{f.required ? ' • required' : ''}{f.type === 'select' ? ` • ${(f.options||[]).join(', ')}` : ''}</span></div><div><button onClick={() => move(i,-1)}>↑</button><button onClick={() => move(i,1)}>↓</button><button onClick={() => startEdit(i)}>Edit</button><button className="danger" onClick={() => remove(i)}>Delete</button></div></div>)}</div>
        </div>
        <form className="form-card" onSubmit={saveField}><h2>{editIndex === null ? 'Add field' : 'Edit field'}</h2><div className="form-grid"><div className="form-field"><label>Label English*</label><input required value={field.label.en} onChange={e => setField({...field, label:{...field.label, en:e.target.value}, key: field.key || slug(e.target.value)})} /></div><div className="form-field"><label>Label Arabic</label><input value={field.label.ar} onChange={e => setField({...field, label:{...field.label, ar:e.target.value}})} /></div><div className="form-field"><label>Key</label><input value={field.key} onChange={e => setField({...field, key:e.target.value})} /></div><div className="form-field"><label>{tr('type')}</label><select value={field.type} onChange={e => setField({...field, type:e.target.value})}>{types.map(t => <option key={t} value={t}>{t}</option>)}</select></div><div className="form-field full"><label>{tr('options')} (select only)</label><input value={Array.isArray(field.options) ? field.options.join(', ') : field.options} onChange={e => setField({...field, options:e.target.value})} placeholder="A4, A5, Custom" /></div><div className="form-field checkbox-field"><label><input type="checkbox" checked={field.required} onChange={e => setField({...field, required:e.target.checked})} /> {tr('required')}</label></div></div><button className="btn primary" type="submit">{tr('save')}</button></form>
        <div className="form-card"><h2>{tr('preview')}</h2><div className="form-grid">{form.fields.map(f => <FieldRenderer key={f.key} field={f} value={f.type==='checkbox'} readOnly />)}</div></div>
      </section>
    </div>
  </div>;
}
