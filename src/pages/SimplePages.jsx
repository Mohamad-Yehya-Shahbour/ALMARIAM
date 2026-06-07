import { useEffect, useState } from 'react';
import { api } from '../api/apiClient';
import { useLang } from '../components/LanguageContext';

export function About() {
  const { lang } = useLang();
  const [about, setAbout] = useState({ en:'', ar:'' });
  useEffect(() => { api.about.get().then(setAbout).catch(console.error); }, []);
  return <section className="container section page-top"><div className="simple-card"><span className="eyebrow">About</span><h1>About Al-Mariam Printing</h1><p>{about?.[lang] || about?.en}</p></div></section>;
}

export function Clients() {
  const { lang, tr } = useLang();
  const [clients, setClients] = useState([]);
  useEffect(() => { api.clients.list().then(setClients).catch(console.error); }, []);
  return <section className="container section page-top"><div className="section-head"><span className="eyebrow">Al-Mariam</span><h1>{tr('clients')}</h1><p>Clients and feedback are managed from the admin portal.</p></div><div className="client-grid">{clients.map(c => <div className="client-card" key={c.id}><img src={c.logo} alt={c.name} /><h3>{c.name}</h3><p>“{c.feedback?.[lang] || c.feedback?.en}”</p></div>)}</div></section>;
}

export function Contact() {
  const [settings, setSettings] = useState(null);
  useEffect(() => { api.settings.get().then(setSettings).catch(console.error); }, []);
  const phone = settings?.contactPhone || '96176648874';
  const instagram = settings?.instagram || 'ALMARIAMPRESS';
  const mapUrl = settings?.mapShareUrl || '#';
  return <section className="container section page-top">
    <div className="contact-hero">
      <div>
        <span className="eyebrow">Contact</span>
        <h1>Contact us</h1>
        <p>Send us your printing requirements or visit our branch. We will help you choose the right paper, printing, finishing and packaging options.</p>
        <div className="contact-actions">
          <a className="btn primary" href={`https://wa.me/${String(phone).replace(/[^0-9]/g, '')}`} target="_blank">WhatsApp {phone}</a>
          <a className="btn light" href={`https://www.instagram.com/${instagram}`} target="_blank">Instagram: {instagram}</a>
          <a className="btn light" href={mapUrl} target="_blank">Open location</a>
        </div>
      </div>
      <div className="contact-card">
        <h3>Al Mariam Printing</h3>
        <p>{settings?.address || 'Al Mariam For Printing & General Trading - 2nd Branch'}</p>
        <p><b>Phone:</b> {phone}</p>
        <p><b>Instagram:</b> {instagram}</p>
      </div>
    </div>
    <div className="map-card">
      {settings?.mapEmbedUrl ? <iframe src={settings.mapEmbedUrl} width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <p>Map loading...</p>}
    </div>
  </section>;
}
