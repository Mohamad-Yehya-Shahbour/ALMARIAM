export function buildQuotationText(request, fields = [], price = '') {
  const lines = [];
  lines.push(`Quotation: ${request.ref}`);
  lines.push(`Customer: ${request.customer?.name || '-'}`);
  lines.push(`Phone: ${request.customer?.phone || '-'}`);
  lines.push(`Product: ${request.productName || '-'}`);
  lines.push(`Category: ${request.categoryTitle?.en || request.categoryId || '-'}`);
  lines.push('');
  fields.forEach((f) => {
    const value = request.values?.[f.key];
    let display = value;
    if (value && typeof value === 'object') display = value.name || '[Uploaded file]';
    if (typeof value === 'boolean') display = value ? 'Yes' : 'No';
    lines.push(`${f.label?.en || f.key}: ${display ?? '-'}`);
  });
  lines.push('');
  lines.push(`Price: ${price || request.price || '-'}`);
  return lines.join('\n');
}

export function downloadQuotationImage(request, fields = [], price = '') {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1500;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#061634';
  ctx.fillRect(0, 0, canvas.width, 170);
  ctx.fillStyle = '#ec168f';
  ctx.fillRect(0, 170, canvas.width, 10);
  ctx.fillStyle = '#12aae6';
  ctx.fillRect(0, 180, canvas.width * 0.35, 10);
  ctx.fillStyle = '#ffd400';
  ctx.fillRect(canvas.width * 0.78, 180, canvas.width * 0.22, 10);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 46px Arial';
  ctx.fillText('Al Mariam Printing', 70, 82);
  ctx.font = '22px Arial';
  ctx.fillText('Printing & General Trading', 73, 122);

  ctx.fillStyle = '#061634';
  ctx.font = 'bold 38px Arial';
  ctx.fillText(`Quotation ${request.ref}`, 70, 250);
  ctx.font = '24px Arial';
  ctx.fillText(`Customer: ${request.customer?.name || '-'}`, 70, 305);
  ctx.fillText(`Phone: ${request.customer?.phone || '-'}`, 70, 345);
  ctx.fillText(`Product: ${request.productName || '-'}`, 70, 385);

  let y = 470;
  ctx.font = 'bold 28px Arial';
  ctx.fillText('Request Details', 70, y);
  y += 45;
  ctx.font = '22px Arial';
  fields.forEach((f) => {
    const value = request.values?.[f.key];
    let display = value;
    if (value && typeof value === 'object') display = value.name || '[Uploaded file]';
    if (typeof value === 'boolean') display = value ? 'Yes' : 'No';
    const line = `${f.label?.en || f.key}: ${display ?? '-'}`;
    wrapText(ctx, line, 70, y, 1040, 32);
    y += Math.max(36, Math.ceil(ctx.measureText(line).width / 1040) * 32);
    if (y > 1260) return;
  });

  ctx.fillStyle = '#f5f7fb';
  ctx.fillRect(0, 1320, canvas.width, 180);
  ctx.fillStyle = '#ec168f';
  ctx.font = 'bold 44px Arial';
  ctx.fillText(`Price: ${price || request.price || '-'}`, 70, 1405);
  ctx.fillStyle = '#061634';
  ctx.font = '22px Arial';
  ctx.fillText('Thank you for choosing Al Mariam Printing.', 70, 1450);

  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `${request.ref}-quotation.png`;
  a.click();
  return url;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export function buildWhatsAppQuotationMessage(request, settings, price = '') {
  const template = settings?.quotationMessageTemplate
    || 'Hello {customerName}, your quotation {ref} for {productName} is ready. Price: {price}. Please check the attached quotation image.';

  return template
    .replaceAll('{customerName}', request.customer?.name || '')
    .replaceAll('{ref}', request.ref || '')
    .replaceAll('{price}', price || request.price || '')
    .replaceAll('{productName}', request.productName || '')
    .trim();
}

export function getWhatsAppCustomerUrl(request, settings, price = '') {
  const rawPhone = request.customer?.phone || '';
  const phone = rawPhone.replace(/[^0-9]/g, '');
  const text = buildWhatsAppQuotationMessage(request, settings, price);
  if (!phone) return '';
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function openWhatsAppQuotation(request, settings, price = '') {
  const url = getWhatsAppCustomerUrl(request, settings, price);
  if (!url) return false;
  window.open(url, '_blank');
  return true;
}
