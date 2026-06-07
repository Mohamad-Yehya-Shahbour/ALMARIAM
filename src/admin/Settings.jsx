import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export default function Settings() {
  const { tr } = useLang();
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { api.settings.get().then(setSettings).catch(console.error); }, []);
  const set = (key, value) => setSettings(s => ({ ...(s || {}), [key]: value }));
  const save = async (e) => { e.preventDefault(); const res = await api.settings.update(settings); setSettings(res); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  if (!settings) return <div className="simple-card">Loading...</div>;
  return <div>
    <div className="admin-top"><div><span className="eyebrow">Admin Portal</span><h1>{tr('settings')}</h1><p>Manage WhatsApp quotation setup, quotation message template, and contact page details.</p></div></div>
    {saved && <div className="success-box">Settings saved.</div>}
    <form className="form-card" onSubmit={save}>
      <div className="form-grid">
        <div className="form-field"><label>Business WhatsApp number</label><input value={settings.whatsappNumber || ''} onChange={e => set('whatsappNumber', e.target.value)} placeholder="96176648874" /><small className="muted">Use WhatsApp Web logged into this number when sending quotations.</small></div>
        <div className="form-field"><label>Contact phone</label><input value={settings.contactPhone || ''} onChange={e => set('contactPhone', e.target.value)} /></div>
        <div className="form-field"><label>Instagram</label><input value={settings.instagram || ''} onChange={e => set('instagram', e.target.value)} /></div>
        <div className="form-field"><label>Address</label><input value={settings.address || ''} onChange={e => set('address', e.target.value)} /></div>
        <div className="form-field full"><label>Quotation WhatsApp text template</label><textarea rows="4" value={settings.quotationMessageTemplate || ''} onChange={e => set('quotationMessageTemplate', e.target.value)} /><small className="muted">Available placeholders: {'{customerName}'}, {'{ref}'}, {'{price}'}, {'{productName}'}</small></div>
        <div className="form-field full"><label>Google Maps embed URL</label><textarea rows="4" value={settings.mapEmbedUrl || ''} onChange={e => set('mapEmbedUrl', e.target.value)} /></div>
        <div className="form-field full"><label>Google Maps / WhatsApp share URL</label><input value={settings.mapShareUrl || ''} onChange={e => set('mapShareUrl', e.target.value)} /></div>
      </div>
      <button className="btn primary mt24" type="submit">Save settings</button>
    </form>
  </div>;
}
