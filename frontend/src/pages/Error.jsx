import { useRouteError } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ErrorPage() {
  const error = useRouteError();

  let message = 'سایت با مشکل مواجه شد';

  if (error.status === 404) {
    message = 'صفحه یا منابع مورد نظر یافت نشد';
  }

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
      <Navbar />
      <div className='center'>
        <h1>{message}</h1>
      </div>
    </>
  );
}
