import { Link, useSubmit } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatPrice from '../utils/priceFormatter';

export default function Product({ id, title, price, description, imageUrl }) {
  const submit = useSubmit();

  const deleteProductHandler = () => {
    const proceed = window.confirm('آیا از حذف این محصول مطمئنید');

    if (proceed) {
      submit({}, { method: 'DELETE' });
    }
  };

  return (
    <div className='container'>
      <div className='box '>
        <img src={imageUrl} className='product-image' />

        <div className='product-info'>
          <h3 className='title'>{title}</h3>
          <p className='price'>{formatPrice(price)} تومان</p>
          <Link className='outline-btn' to='edit'>
            ویرایش
          </Link>
          <button className='outline-btn delete' onClick={deleteProductHandler}>
            حذف
          </button>
        </div>
      </div>

      <div className='box description'>{description}</div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};
