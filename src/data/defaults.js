export const defaultCategories = [
  { id:'books', name:{en:'Books & Notebooks',ar:'كتب ودفاتر'}, steps:['Folding','Cutting','Cellophane','Coverage','Packaging'] },
  { id:'packaging', name:{en:'Packaging',ar:'تغليف'}, steps:['Die cutting','Gluing','Packaging'] },
  { id:'general', name:{en:'Marketing & Stationery',ar:'مواد دعائية وقرطاسية'}, steps:['Cutting','Packaging'] },
  { id:'ncr', name:{en:'NCR Invoices',ar:'فواتير NCR'}, steps:['Numbering','Binding','Packaging'] }
];

export const defaultProducts = [
  { id:'books', name:{en:'Books',ar:'كتب'}, categoryId:'books', desc:{en:'Hardcover, paperback, glued, folded and spiral-bound books.',ar:'كتب بغلاف كرتون أو ورقي، تلزيق، تكسير أو راصور.'}, image:'/assets/images/products/books.jpg' },
  { id:'notebooks', name:{en:'Notebooks',ar:'دفاتر ملاحظات'}, categoryId:'books', desc:{en:'Custom notebooks, NCR books, agendas and branded office books.',ar:'دفاتر مخصصة، دفاتر NCR، أجندات ودفاتر للشركات.'}, image:'/assets/images/products/notebooks.jpg' },
  { id:'catalogues', name:{en:'Catalogues',ar:'كتالوجات'}, categoryId:'books', desc:{en:'Professional catalogues for products, events and sales teams.',ar:'كتالوجات احترافية للمنتجات والمعارض وفرق البيع.'}, image:'/assets/images/products/catalogues.jpg' },
  { id:'bags', name:{en:'Bags',ar:'أكياس'}, categoryId:'packaging', desc:{en:'Paper bags with rope, ribbon or regular handle options.',ar:'أكياس ورقية مع خيارات يد حبل أو شريط أو مسكة عادية.'}, image:'/assets/images/products/bags.jpg' },
  { id:'boxes', name:{en:'Boxes & sleeves',ar:'علب وسليف'}, categoryId:'packaging', desc:{en:'Custom boxes, sleeves and packaging with die cut support.',ar:'علب وسليف وتغليف مخصص مع دعم قالب القص.'}, image:'/assets/images/products/boxes.jpg' },
  { id:'business-cards', name:{en:'Business cards',ar:'بطاقات عمل'}, categoryId:'general', desc:{en:'Premium cards with matte, glossy, foil or spot UV options.',ar:'بطاقات عمل فاخرة مع خيارات مات، لمّيع، بصم أو UV.'}, image:'/assets/images/products/business-cards.jpg' },
  { id:'stickers', name:{en:'Stickers / Vinyl',ar:'ملصقات / فينيل'}, categoryId:'general', desc:{en:'Labels, stickers and vinyl prints for products and displays.',ar:'ليبلات وستكرز وفينيل للمنتجات والعرض.'}, image:'/assets/images/products/stickers.jpg' },
  { id:'invoices', name:{en:'Invoices / NCR',ar:'فواتير / NCR'}, categoryId:'ncr', desc:{en:'NCR invoice books with copy count, numbering and cover options.',ar:'دفاتر فواتير NCR مع عدد النسخ والترقيم والغلاف.'}, image:'/assets/images/products/invoices-ncr.jpg' },
  { id:'banners', name:{en:'Banners',ar:'لافتات'}, categoryId:'general', desc:{en:'Indoor and outdoor banners for campaigns and shops.',ar:'لافتات داخلية وخارجية للحملات والمحلات.'}, image:'/assets/images/products/banners.jpg' }
];

export const defaultForms = [
  { id:'books', title:{en:'Books / Notebooks / Catalogues',ar:'كتب / دفاتر / كتالوجات'}, fields:[
    {key:'quantity', label:{en:'Quantity',ar:'الكمية'}, type:'int', required:true},
    {key:'pages', label:{en:'Number of pages',ar:'عدد الصفحات'}, type:'int', required:true},
    {key:'size', label:{en:'Size',ar:'القياس'}, type:'select', required:true, options:['A4','A5','Custom']},
    {key:'paper_type', label:{en:'Paper type',ar:'نوع الورق'}, type:'select', required:true, options:['Offset','Couche matte','Couche glossy','Sticker paper']},
    {key:'cover_needed', label:{en:'Cover needed',ar:'يوجد غلاف'}, type:'checkbox', required:false},
    {key:'printing', label:{en:'Printing',ar:'الطباعة'}, type:'select', required:true, options:['One color','Full color','Pantone']},
    {key:'delivery_date', label:{en:'Preferred delivery date',ar:'تاريخ التسليم المطلوب'}, type:'date', required:false},
    {key:'artwork', label:{en:'Artwork / file link',ar:'ملف التصميم / رابط'}, type:'file', required:false},
    {key:'notes', label:{en:'Additional notes',ar:'ملاحظات إضافية'}, type:'textarea', required:false}
  ]},
  { id:'packaging', title:{en:'Bags / Boxes / Sleeves',ar:'أكياس / علب / سليف'}, fields:[
    {key:'quantity', label:{en:'Quantity',ar:'الكمية'}, type:'int', required:true},
    {key:'height', label:{en:'Height',ar:'الطول'}, type:'string', required:true},
    {key:'width', label:{en:'Width',ar:'العرض'}, type:'string', required:true},
    {key:'depth', label:{en:'Depth',ar:'العمق'}, type:'string', required:false},
    {key:'paper_weight', label:{en:'Paper weight',ar:'سماكة الورق'}, type:'select', required:false, options:['250 gsm','300 gsm','350 gsm','400 gsm']},
    {key:'handle_needed', label:{en:'Handle needed',ar:'تحتاج يد / مسكة'}, type:'checkbox', required:false},
    {key:'finishing', label:{en:'Finishing',ar:'التشطيب'}, type:'select', required:false, options:['Matte lamination','Glossy lamination','Foil','Emboss','Spot UV']},
    {key:'artwork', label:{en:'Artwork / sample',ar:'تصميم / عينة'}, type:'file', required:false},
    {key:'notes', label:{en:'Additional notes',ar:'ملاحظات إضافية'}, type:'textarea', required:false}
  ]},
  { id:'general', title:{en:'Cards / Stickers / Labels / Banners',ar:'بطاقات / ستكرز / ليبلات / لافتات'}, fields:[
    {key:'quantity', label:{en:'Quantity',ar:'الكمية'}, type:'int', required:true},
    {key:'size', label:{en:'Size',ar:'القياس'}, type:'string', required:true},
    {key:'material', label:{en:'Material',ar:'المادة'}, type:'select', required:false, options:['Paper','Vinyl','Sticker','PVC','Canvas']},
    {key:'waterproof', label:{en:'Waterproof',ar:'مقاوم للماء'}, type:'checkbox', required:false},
    {key:'printing', label:{en:'Printing',ar:'الطباعة'}, type:'select', required:false, options:['One side','Two sides','Full color']},
    {key:'notes', label:{en:'Additional notes',ar:'ملاحظات إضافية'}, type:'textarea', required:false}
  ]},
  { id:'ncr', title:{en:'NCR Invoices',ar:'فواتير NCR'}, fields:[
    {key:'books_count', label:{en:'Books count',ar:'عدد الدفاتر'}, type:'int', required:true},
    {key:'copies', label:{en:'Copies per invoice',ar:'عدد النسخ'}, type:'select', required:true, options:['2 copies','3 copies','4 copies']},
    {key:'numbering', label:{en:'Numbering required',ar:'تحتاج ترقيم'}, type:'checkbox', required:false},
    {key:'start_number', label:{en:'Start number',ar:'رقم البداية'}, type:'int', required:false},
    {key:'cover', label:{en:'Cover',ar:'الغلاف'}, type:'select', required:false, options:['With cover','Without cover']},
    {key:'notes', label:{en:'Additional notes',ar:'ملاحظات إضافية'}, type:'textarea', required:false}
  ]}
];

export const fixedOrderSteps = ['Editing', 'CTP', 'Printing'];

export const defaultSettings = {
  whatsappNumber: '96176648874',
  quotationMessageTemplate: 'Hello {customerName}, your quotation {ref} is ready. Price: {price}. Please find the quotation details image and confirm if you want us to proceed.',
  contactPhone: '96176648874',
  instagram: 'ALMARIAMPRESS',
  mapShareUrl: 'https://api.whatsapp.com/send?text=https%3A%2F%2Fmaps.app.goo.gl%2Fk6pjHwWDhWkPYmXi8',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d293.10507037463856!2d35.477699188369606!3d33.78377818159088!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1bbf7aeedb8f%3A0x4ba33a59d5fea76f!2sAl%20Mariam%20For%20Printing%20%26%20General%20Trading%20(2nd%20Branch)!5e0!3m2!1sen!2slb!4v1780762046651!5m2!1sen!2slb',
  address: 'Al Mariam For Printing & General Trading - 2nd Branch'
};

export const defaultOrders = [];

export const defaultRequests = [
  { id:'demo-1', ref:'QT-2049', status:'New', createdAt:'2026-06-06T08:10:00', customer:{name:'Moulin d’Or', phone:'03 000 000', email:'info@example.com'}, productId:'boxes', productName:'Boxes & sleeves', categoryId:'packaging', categoryTitle:{en:'Bags / Boxes / Sleeves',ar:'أكياس / علب / سليف'}, price:'', quotationSentAt:'', orderId:'', values:{quantity:'5000', height:'24 cm', width:'18 cm', depth:'7 cm', paper_weight:'350 gsm', handle_needed:true, finishing:'Matte lamination', artwork:{name:'box-sample.pdf', dataUrl:'', type:'application/pdf'}, notes:'Need premium packaging for food products.'}},
  { id:'demo-2', ref:'QT-2048', status:'In Review', createdAt:'2026-06-05T14:25:00', customer:{name:'Chopin', phone:'70 111 222', email:'chopin@example.com'}, productId:'catalogues', productName:'Catalogues', categoryId:'books', categoryTitle:{en:'Books / Notebooks / Catalogues',ar:'كتب / دفاتر / كتالوجات'}, price:'', quotationSentAt:'', orderId:'', values:{quantity:'800', pages:'48', size:'A4', paper_type:'Couche matte', cover_needed:true, printing:'Full color', delivery_date:'2026-06-20', artwork:'catalogue-drive-link', notes:'Please quote matte and glossy lamination options.'}}
];

export const defaultUsers = [
  { id:'u-1', username:'admin', fullName:'Admin User', email:'admin@almariam.test', password:'admin123', role:'Admin', isActive:true },
  { id:'u-2', username:'sales', fullName:'Sales User', email:'sales@almariam.test', password:'sales123', role:'Sales', isActive:true }
];

export const defaultAbout = {
  en:'Al-Mariam Printing & General Trading is an offset printing partner for companies that need reliable production, strong finishing quality and practical support from idea to delivery.',
  ar:'مطبعة المريم للتجارة العامة هي شريك طباعة أوفست للشركات التي تحتاج إنتاج موثوق، جودة تشطيب عالية، ومتابعة عملية من الفكرة حتى التسليم.'
};

export const defaultClients = [
  { id:'c-1', name:'Moulin d’Or', logo:'/assets/images/products/bags.jpg', feedback:{en:'Fast quotation, clean packaging quality and reliable delivery.',ar:'عرض سعر سريع، جودة تغليف مرتبة وتسليم موثوق.'} },
  { id:'c-2', name:'Chopin', logo:'/assets/images/products/catalogues.jpg', feedback:{en:'The catalogues were printed with excellent color consistency.',ar:'الكتالوجات كانت مطبوعة بتناسق ألوان ممتاز.'} },
  { id:'c-3', name:'Local Boutique', logo:'/assets/images/products/business-cards.jpg', feedback:{en:'Helpful team and premium cards with a professional finish.',ar:'فريق متعاون وبطاقات فاخرة بتشطيب احترافي.'} }
];

export const t = {
  en: { home:'Home', about:'About us', products:'Products', clients:'Clients', quote:'Request quote', contact:'Contact', admin:'Admin', dashboard:'Dashboard', requests:'Quote Requests', formBuilder:'Form Builder', language:'عربي', heroTitle:'Offset printing that turns ideas into finished products.', heroText:'Al-Mariam Printing handles projects from prepress to finishing with reliable quality, practical guidance and fair pricing.', quoteNow:'Request a quotation', browse:'Browse products', submit:'Submit request', clientInfo:'Client information', chooseProduct:'Choose product', categoryForm:'Category form', success:'Request saved. You can review it from the admin portal.', new:'New', inReview:'In Review', done:'Done', save:'Save', addField:'Add field', reset:'Reset defaults', required:'Required', type:'Type', options:'Options', preview:'Live preview', customer:'Customer', product:'Product', date:'Date', status:'Status', actions:'Actions', details:'Details', yes:'Yes', no:'No', users:'Users', categories:'Categories', aboutEditor:'About Editor', adminProducts:'Products', adminClients:'Clients', orders:'Orders', settings:'Settings', login:'Login', logout:'Logout' },
  ar: { home:'الرئيسية', about:'نبذة عنا', products:'منتجاتنا', clients:'عملاؤنا', quote:'طلب عرض سعر', contact:'تواصل معنا', admin:'الإدارة', dashboard:'لوحة التحكم', requests:'طلبات الأسعار', formBuilder:'منشئ النماذج', language:'EN', heroTitle:'طباعة أوفست تحوّل الأفكار إلى منتجات جاهزة.', heroText:'مطبعة المريم تهتم بالمشروع من التحضير قبل الطباعة حتى التشطيب، مع جودة موثوقة وأسعار مناسبة.', quoteNow:'اطلب عرض سعر', browse:'تصفح المنتجات', submit:'إرسال الطلب', clientInfo:'معلومات العميل', chooseProduct:'اختر المنتج', categoryForm:'نموذج الفئة', success:'تم حفظ الطلب. يمكنك مراجعته من لوحة الإدارة.', new:'جديد', inReview:'قيد المراجعة', done:'منجز', save:'حفظ', addField:'إضافة حقل', reset:'إعادة الضبط', required:'إجباري', type:'النوع', options:'الخيارات', preview:'معاينة مباشرة', customer:'العميل', product:'المنتج', date:'التاريخ', status:'الحالة', actions:'الإجراءات', details:'التفاصيل', yes:'نعم', no:'لا', users:'المستخدمون', categories:'الفئات', aboutEditor:'تعديل نبذة عنا', adminProducts:'المنتجات', adminClients:'العملاء', orders:'الطلبات', settings:'الإعدادات', login:'تسجيل الدخول', logout:'تسجيل الخروج' }
};
