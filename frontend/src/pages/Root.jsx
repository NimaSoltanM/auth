import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout() {
  const navigation = useNavigation();

  const loading = navigation.state === 'loading';

  return (
    <>
      <Navbar />
      <div className='center'>
        {loading && 'در حال بارگذاری ...'}
        <Outlet />
      </div>
    </>
  );
}
