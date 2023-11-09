const express = require('express');
const cors = require('cors');
const { sign, verify } = require('jsonwebtoken');
const fs = require('fs');

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

let products = [
  {
    id: '1',
    title: 'MacBook Pro MNW93',
    price: 145000000,
    description:
      'لپ تاپ MacBook Pro MNW93 2023 یکی از جدیدترین لپ تاپ های شرکت اپل است که در سال 2023 معرفی شده است. این لپ تاپ دارای صفحه نمایش 16.2 اینچی با رزولوشن 3456x2234 پیکسل است و با فناوری True Tone بهترین تجربه بصری را برای کاربران خود به ارمغان می‌آورد. این لپ تاپ دارای پردازنده قدرتمند M2 Pro با 16 گیگابایت RAM است و می‌تواند برای برنامه های سنگین را به راحی اجرا کند. همچنین، این لپ تاپ دارای یک ترابایت فضای ذخیره سازی SSD است که به شما امکان ذخیره‌سازی فایل‌های حجیم را می‌دهد. این لپ تاپ دارای پورت‌های متنوعی نظیر پورت Thunderbolt 4 و یک پورت HDMI است که به شما امکان اتصال به انواع دستگاه‌های دیگر را می‌دهد. همچنین، این لپ تاپ دارای باتری داخلی با عمر طولانی است که به شما اجازه می‌دهد در هنگام سفر راحت و بدون نیاز به شارژر با آن کار کنید. به طور کلی، لپ تاپ MacBook Pro MNW93 2023 یک انتخاب عالی برای کاربران حرفه‌ای و علاقه‌مندان به محصولات بالارده و مدرن است.',
    imageUrl:
      'https://dkstatics-public.digikala.com/digikala-products/3a6f118edd9a654d427ad4c022cd6cb6d54f18e2_1671293430.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90',
  },
  {
    id: '2',
    title: 'Alienware X17',
    price: 200000000,
    description:
      'در حالی که Alienware به ساخت محصولات گران قیمت مشهور است، اما در ساخت دستگاه هایی با طراحی زیبا نیز رکورد جدیدی به دست آورده است و m17 احتمالا زیباترین لپ تاپی است که تا کنون ساخته است. Alienware m17 در نگاه اول جسورانه و جذاب به نظر می‌رسد. بخش اعظم دستگاه از پوشش نرم و مات در کنار شاسی منیزیمی بسیار محکم ساخته شده است، و LEDهایی از نوع RGB علاوه بر اینکه در لوگو استفاده شده، دور دریچه های هوای لانه زنبوری در عقب نیز حلقه زده است. لپ تاپ Alienware m17 تنومند، دارای کیفیت ساخت عالی و همچنین پورت های ارتباطی کاملی است که می‌توان 3 عدد درگاه USB 3.1، یک درگاه Thunderbolt 3 و همچنین خروجی های HDMI و mini-Displayport را مشاهده کرد. در پشت دستگاه نیز می‌توان به یک درگاه اختصاصی نا آشنا برای تقویت گرافیک اشاره کرد. تقویت کننده گرافیک یک باکس خارجی است که در آن می‌توانید یک GPU رومیزی نصب کنید و آن را از طریق درگاه تقویت گرافیک به m17 متصل کنید. با اینکار می‌توانید هم عمر دستگاه را افزایش دهید و همچنین با پرداخت هزینه اولیه کمتر نسبت به مدل بررسی شده، m17 را با مدل گرافیک 1660 Ti خریداری کرده و در هزینه های خود صرفه جویی کنید و در آینده اگر نیاز داشتید یک گرافیک قدرتمندتر اضافه کنید.',
    imageUrl: 'https://cdnfa.com/powerbank360/2cdc/files/3874613.jpg',
  },
  {
    id: '3',
    title: 'MSI Crosshair 15',
    price: 88000000,
    description:
      'شرکت ام اس آی یکی از شرکت‌های با قدمت و با سابقه در زمینه‌ی تولید قطعات کامپیوتر و لپ تاپ است و محصولات این شرکت از نظر کیفیت ساخت در سطح بسیار بالایی قرار دارند. لپ تاپ مدل Crosshair 15 B12UEZO یکی از محصولات پرطرفدار و فوق‌العاده زیبای این شرکت است که از مشخصات فنی قدرتمندی بهره می‌برد. این لپ تاپ به پردازنده‌ی مرکزی Core i7 12700H با فرکانس نهایی 4.7 گیگاهرتز، حافظه کش 24 مگابایتی، 14 هسته (6 هسته Performance و 8 هسته Efficient) و 20 رشته مجهز شده است. همچنین، 16 گیگابایت رم از نوع DDR5 با سرعت 4800 مگاهرتز و یک ترابایت حافظه‌ی ذخیره‌سازی SSD M.2 NVMe PCIe نسل چهارم برای این لپ تاپ در نظر گرفته شده است تا در مجموع شاهد سرعت بسیار بالای آن در انجام امور مختلف باشیم. این لپ تاپ با توجه به مجهز شدن به پردازنده‌ی گرافیکی GeForce RTX 3060 و صفحه نمایش 1600x2560 با نرخ به‌روزرسانی تصویر 165 هرتز می‌تواند بازی‌های ویدیویی سنگین را با کیفیت بالا و به صورت روان اجرا کند.',
    imageUrl:
      'https://dkstatics-public.digikala.com/digikala-products/20cc22642b109659942c2a8d783f25d2ac23500d_1675840446.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90',
  },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product)
    res.status(404).send(`Product with id ${req.params.id} not found`);
  res.json(product);
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = verify(token, 'secretkey');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/products', verifyToken, (req, res) => {
  const { title, price, description, imageUrl } = req.body;

  if (!title || !price || !description || !imageUrl) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newProduct = {
    id: String(products.length + 1),
    title,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);
  setTimeout(() => {
    res.status(201).json(products);
  }, 2000);
});

app.put('/products/:id', verifyToken, (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const product = products.find((p) => p.id === req.params.id);
  if (!product)
    res.status(404).send(`Product with id ${req.params.id} not found`);

  if (!title || !price || !description || !imageUrl) {
    return res.status(400).send('Missing fields');
  }

  product.title = title;
  product.price = price;
  product.description = description;
  product.imageUrl = imageUrl;

  res.status(200).json(product);
});

app.delete('/products/:id', verifyToken, (req, res) => {
  products = products.filter((p) => p.id !== req.params.id);
  res.status(204).send();
});

//auth

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const users = JSON.parse(fs.readFileSync('users.json'));
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  users.push({ email, password });
  fs.writeFileSync('users.json', JSON.stringify(users));
  res.status(201).send('User created');
});

function generateToken(user) {
  return sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const users = JSON.parse(fs.readFileSync('users.json'));

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const token = generateToken(user);

  res.json({
    token,
    message: 'Login successful',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
