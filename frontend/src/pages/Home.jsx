import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/products');
  };

  return (
    <>
      <h1>صفحه ی اصلی</h1>
      <button onClick={navigateHandler}>ورود به صفحه ی محصولات</button>
    </>
  );
}
