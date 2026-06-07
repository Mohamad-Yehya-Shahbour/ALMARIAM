import { useLang } from './LanguageContext';

export function FieldRenderer({ field, value, onChange, readOnly = false }) {
  const { lang, tr } = useLang();
  const label = field.label?.[lang] || field.label?.en || field.key;
  const common = { id: field.key, name: field.key, required: field.required, value: value ?? '', onChange: (e) => onChange?.(field.key, e.target.value), disabled: readOnly };

  if (readOnly) {
    if (field.type === 'file') {
      const fileName = typeof value === 'object' ? value?.name : value;
      return <div className="detail-line"><span>{label}</span><strong>{fileName || '-'}</strong>{value?.dataUrl && <a className="mini-link download-link" href={value.dataUrl} download={value.name}>Download file</a>}</div>;
    }
    let display = value;
    if (field.type === 'checkbox') display = value ? tr('yes') : tr('no');
    return <div className="detail-line"><span>{label}</span><strong>{display || '-'}</strong></div>;
  }

  if (field.type === 'textarea') return <div className="form-field full"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><textarea {...common} rows="4" /></div>;
  if (field.type === 'select') return <div className="form-field"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><select {...common}><option value="">--</option>{(field.options || []).map(o => <option key={o} value={o}>{o}</option>)}</select></div>;
  if (field.type === 'date') return <div className="form-field"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><input {...common} type="date" /></div>;
  if (field.type === 'int') return <div className="form-field"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><input {...common} type="number" min="0" /></div>;
  if (field.type === 'checkbox') return <div className="form-field checkbox-field"><label><input name={field.key} type="checkbox" checked={!!value} disabled={readOnly} onChange={(e) => onChange?.(field.key, e.target.checked)} /> {label}</label></div>;
  if (field.type === 'file') return <div className="form-field full"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><input id={field.key} type="file" required={field.required} disabled={readOnly} onChange={(e) => onChange?.(field.key, e.target.files?.[0] || null, 'file')} />{value?.name && <small className="muted">Selected: {value.name}</small>}<input className="mt8" placeholder="Or paste a file link" value={typeof value === 'string' ? value : ''} onChange={(e) => onChange?.(field.key, e.target.value)} /></div>;
  return <div className="form-field"><label htmlFor={field.key}>{label}{field.required && <b>*</b>}</label><input {...common} type="text" /></div>;
}
