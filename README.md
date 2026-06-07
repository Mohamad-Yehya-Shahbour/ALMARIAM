# Al-Mariam Printing React Vite Prototype

Run:

```bash
npm install
npm run dev
```

What is included:
- React + Vite frontend.
- Public website pages and quotation flow.
- Admin portal with Dashboard, Requests table, and Form Builder.
- Dynamic forms per category using localStorage.
- Field types: string, integer, date, select with options, checkbox, textarea, and file/link.
- Arabic / English toggle also available in the admin portal.
- Runtime quote requests: submit from public quotation page, then review values by clicking the request row in admin portal.

Important routes:
- `/` public home
- `/products`
- `/quotation`
- `/admin`
- `/admin/requests`
- `/admin/form-builder`

Data is temporary in browser localStorage. Next backend step can replace `src/utils/storage.js` with API calls to .NET endpoints.
