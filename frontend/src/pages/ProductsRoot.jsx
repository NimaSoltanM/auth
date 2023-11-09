import { NavLink, Outlet } from 'react-router-dom';

export default function ProductsRootLayout() {
  return (
    <>
      <div className='tabs'>
        <NavLink to='/products' className='tab' end>
          همه ی محصولات
        </NavLink>

        <NavLink to='/products/new' className='tab'>
          اضافه کردن
        </NavLink>
      </div>

      <Outlet />
    </>
  );
}
