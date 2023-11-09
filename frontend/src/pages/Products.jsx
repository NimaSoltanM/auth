import { useLoaderData, json } from 'react-router-dom';
import Products from '../components/Products';

export default function ProductsPage() {
  const products = useLoaderData();

  return <Products products={products} />;
}

export async function loader() {
  const res = await fetch('http://localhost:3001/products');
  if (!res.ok) {
    throw json({ message: 'محصولات یافت نشدند !' }, { status: 500 });
  } else {
    const data = await res.json();
    return data;
  }
}
