import { Link } from 'react-router-dom';
import formatPrice from '../utils/priceFormatter';

import PropTypes from 'prop-types';

export default function Products({ products }) {
  return (
    <div className='products-list'>
      <h1 style={{ marginBottom: '2rem' }}>محصولات</h1>

      <div className='grid'>
        {products.map((prod) => (
          <div key={prod.id} className='card'>
            <img src={prod.imageUrl} alt={prod.title} />

            <div className='card-content'>
              <p>{prod.title}</p>
              <h4>{formatPrice(prod.price)}</h4>
            </div>

            <Link className='outline-btn' to={`/products/${prod.id}`}>
              مشاهده
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array,
};
