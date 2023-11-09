import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage, { loader as productsLoader } from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage, {
  loader as productLoader,
  action as deleteProductAction,
} from './pages/ProductDetail';
import ProductsRootLayout from './pages/ProductsRoot';
import NewProductPage from './pages/NewProduct';
import EditProductPage from './pages/EditProduct';
import { action as changeProductsAction } from './components/ProductForm';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/products',
          element: <ProductsRootLayout />,
          children: [
            {
              index: true,
              element: <ProductsPage />,
              loader: productsLoader,
            },
            {
              path: '/products/new',
              element: <NewProductPage />,
              action: changeProductsAction,
            },
            {
              path: ':productId',
              loader: productLoader,
              id: 'product-loader',
              children: [
                {
                  path: '/products/:productId',
                  element: <ProductDetailPage />,
                  action: deleteProductAction,
                },
                {
                  path: 'edit',
                  element: <EditProductPage />,
                  action: changeProductsAction,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
