import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <div>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              خانه
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              محصولات
            </NavLink>
          </li>
        </div>
        <div>
          <li>
            <NavLink
              to='/auth/signup'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              ثبت نام
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/auth/login'
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              ورود
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
