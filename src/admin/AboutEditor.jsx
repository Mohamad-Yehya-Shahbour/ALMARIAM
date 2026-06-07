import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function AboutEditor() {
  const { tr } = useLang();
  const [about, setAbout] = useState({ en:'', ar:'' });
  const [saved, setSaved] = useState(false);
  useEffect(() => { api.about.get().then(setAbout).catch(console.error); }, []);
  const submit = async (e) => { e.preventDefault(); const updated = await api.about.update(about); setAbout(updated); setSaved(true); setTimeout(() => setSaved(false), 1500); };
  return <div><div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('aboutEditor')}</h1><p>Edit the content shown on the public About Us page.</p></div></div>{saved && <div className="success-box">Saved</div>}<form className="form-card" onSubmit={submit}><div className="form-grid"><div className="form-field full"><label>About English</label><textarea rows="6" value={about.en} onChange={e => setAbout({...about, en:e.target.value})}/></div><div className="form-field full"><label>About Arabic</label><textarea rows="6" value={about.ar} onChange={e => setAbout({...about, ar:e.target.value})}/></div></div><button className="btn primary" type="submit">{tr('save')}</button></form></div>;
}
