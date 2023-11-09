import ProductForm from '../components/ProductForm';

import { useRouteLoaderData } from 'react-router-dom';

export default function EditProductPage() {
  const product = useRouteLoaderData('product-loader');

  return <ProductForm product={product} method='PUT' />;
}
