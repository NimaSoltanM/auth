import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import Product from '../components/Product';

export default function ProductDetailPage() {
  const product = useRouteLoaderData('product-loader');

  return <Product {...product} />;
}

export async function loader({ params }) {
  const id = params.productId;

  const res = await fetch('http://localhost:3001/products/' + id);

  if (!res.ok) {
    throw json({ message: 'محصول مورد نظر یافت نشد' }, { status: 500 });
  } else {
    const data = await res.json();
    return data;
  }
}

export async function action({ params }) {
  const id = params.productId;

  const res = await fetch('http://localhost:3001/products/' + id, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw json({ message: 'کالا حذف نشد' }, { status: 500 });
  }

  return redirect('/products');
}
