import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ReactComponent as Icon } from '../../assets/logo-threads.svg';
import AuthButton from '../../pages/auth/components/AuthButton';

import './Header.css';

const navItemClassName = ({ isActive }) =>
  clsx('header-nav-item', { active: isActive });

function Header({ className }) {
  return (
    <header className={clsx('header', className)}>
      <Link to="/">
        <div className="header-logo">
          <Icon width={32} height={32} fill="red" />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/ads/new"
          replace
          className={navItemClassName}
        >
          New Ad
        </NavLink>
        <NavLink to="/signup" className={navItemClassName} style={{ color: 'grey'}} end>
          SignUp
        </NavLink>
        <NavLink to="/ads" className={navItemClassName} end>
          Last ads
        </NavLink>
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

export default Header;
