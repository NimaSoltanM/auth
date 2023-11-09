import { Form, useNavigation, useActionData } from 'react-router-dom';
import { json, redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

export default function ProductForm({ product, method }) {
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method={method}>
      <div>
        <label htmlFor='title'>نام</label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={product ? product.title : ''}
        />
      </div>

      <div>
        <label htmlFor='price'>قیمت</label>
        <input
          type='number'
          id='price'
          name='price'
          required
          defaultValue={product ? product.price : ''}
        />
      </div>

      <div>
        <label htmlFor='description'>توضیحات</label>
        <textarea
          id='description'
          name='description'
          required
          defaultValue={product ? product.description : ''}
          rows={10}
        />
      </div>

      <div>
        <label htmlFor='imageUrl'>آدرس عکس</label>
        <input
          type='url'
          id='imageUrl'
          name='imageUrl'
          required
          defaultValue={product ? product.imageUrl : ''}
        />
      </div>

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '... در حال ثبت' : 'ثبت'}
      </button>

      {actionData && actionData.error && (
        <div className='center'>{actionData.error}</div>
      )}
    </Form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object,
  method: PropTypes.string,
};

export async function action({ params, request }) {
  const { method } = request;
  const data = await request.formData();

  const productData = {
    title: data.get('title'),
    price: data.get('price'),
    description: data.get('description'),
    imageUrl: data.get('imageUrl'),
  };

  let url = 'http://localhost:3001/products';

  if (method === 'PUT') {
    const { productId } = params;
    url += `/${productId}`;
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    return res;
  }

  return redirect('/products');
}
