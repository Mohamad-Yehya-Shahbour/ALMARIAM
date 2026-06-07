import { useEffect, useMemo, useState } from 'react';
import { FieldRenderer } from './FieldRenderer';
import { useLang } from './LanguageContext';
import { api, makeOrderRef } from '../api/apiClient';
import { buildWhatsAppQuotationMessage, downloadQuotationImage, getWhatsAppCustomerUrl } from '../utils/quotationImage';

export default function RequestDetailsModal({ request, fields, onClose, onStatusChange, onRequestUpdated }) {
  const { tr, lang } = useLang();
  const [price, setPrice] = useState('');
  const [settings, setSettings] = useState(null);
  const [orders, setOrders] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!request) return;
    setPrice(request.price || '');
    setCopied(false);
    Promise.all([api.settings.get().catch(() => null), api.orders.list().catch(() => [])])
      .then(([s, o]) => { setSettings(s); setOrders(o || []); });
  }, [request]);

  const whatsappMessage = useMemo(() => {
    if (!request) return '';
    return buildWhatsAppQuotationMessage(request, settings, price);
  }, [request, settings, price]);

  const whatsappUrl = useMemo(() => {
    if (!request) return '';
    return getWhatsAppCustomerUrl(request, settings, price);
  }, [request, settings, price]);

  if (!request) return null;

  const updateStatus = async (status) => {
    const patch = { status, price };
    const updated = await onStatusChange(request.id, status, patch);
    onRequestUpdated?.(updated || { ...request, ...patch });
  };

  const savePrice = async () => {
    const updated = await api.requests.update(request.id, { status: request.status, price });
    onRequestUpdated?.(updated);
  };

  const markQuotationDone = async () => {
    const updated = await api.requests.update(request.id, {
      status: 'Done',
      price,
      quotationSentAt: request.quotationSentAt || new Date().toISOString()
    });
    onRequestUpdated?.(updated);
  };

  const copyMessage = async () => {
    await navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const openWhatsApp = async () => {
    await markQuotationDone();
    if (whatsappUrl) window.open(whatsappUrl, '_blank');
  };

  const makeOrder = async () => {
    const fixedSteps = ['Editing', 'CTP', 'Printing'];
    const extraSteps = request.categorySteps || [];
    const steps = [...fixedSteps, ...extraSteps].map((name, index) => ({ name, status: index === 0 ? 'In Progress' : 'Pending', completedAt: null }));
    const order = await api.orders.create({
      id: crypto.randomUUID(),
      ref: makeOrderRef(orders),
      quoteRequestId: request.id,
      quoteRef: request.ref,
      customer: request.customer,
      productName: request.productName,
      categoryId: request.categoryId,
      price,
      status: 'In Progress',
      createdAt: new Date().toISOString(),
      steps
    });
    setOrders([order, ...orders]);
    const updated = await api.requests.update(request.id, { status: 'Done', price, orderId: order.id });
    onRequestUpdated?.(updated);
  };

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
      <div className="modal-head">
        <div>
          <div className="eyebrow">{request.ref}</div>
          <h2>{tr('details')} — {request.productName}</h2>
        </div>
        <button className="icon-btn" onClick={onClose}>×</button>
      </div>
      <div className="modal-body">
        <div className="detail-grid">
          <div className="detail-line"><span>{tr('customer')}</span><strong>{request.customer?.name}</strong></div>
          <div className="detail-line"><span>Phone</span><strong>{request.customer?.phone || '-'}</strong></div>
          <div className="detail-line"><span>Email</span><strong>{request.customer?.email || '-'}</strong></div>
          <div className="detail-line"><span>{tr('date')}</span><strong>{new Date(request.createdAt).toLocaleString()}</strong></div>
          <div className="detail-line"><span>{tr('status')}</span><select value={request.status} onChange={(e) => updateStatus(e.target.value)}><option>New</option><option>In Review</option><option>Done</option></select></div>
          <div className="detail-line"><span>Price</span><div className="inline-actions"><input value={price} onChange={e => setPrice(e.target.value)} placeholder="ex: 250 USD" /><button className="btn light" onClick={savePrice}>Save</button></div></div>
        </div>

        <div className="quotation-share-box">
          <div>
            <h3>WhatsApp quotation message</h3>
            <p className="muted">Download the quotation image, copy this text, then open WhatsApp Web and send both manually.</p>
          </div>
          <textarea className="copy-textarea" rows="5" readOnly value={whatsappMessage} />
          <div className="modal-actions-row">
            <button className="btn primary" onClick={() => downloadQuotationImage({ ...request, price }, fields, price)} disabled={!price}>Download quotation image</button>
            <button className="btn light" onClick={copyMessage}>{copied ? 'Copied' : 'Copy message'}</button>
            <button className="btn light" onClick={openWhatsApp} disabled={!whatsappUrl || !price}>Open WhatsApp tab</button>
            <button className="btn light" onClick={markQuotationDone} disabled={!price}>Mark quotation done</button>
            <button className="btn light" onClick={makeOrder} disabled={!!request.orderId || !price}>{request.orderId ? 'Order created' : 'Make order'}</button>
          </div>
          {!request.customer?.phone && <div className="warning-box mt12">Customer phone is missing, so WhatsApp cannot be opened directly.</div>}
        </div>

        <h3 className="section-title">{request.categoryTitle?.[lang] || request.categoryTitle?.en}</h3>
        <div className="detail-grid">
          {fields.map(f => <FieldRenderer key={f.key} field={f} value={request.values?.[f.key]} readOnly />)}
        </div>
      </div>
    </div>
  </div>;
}
