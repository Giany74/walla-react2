import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

import './Layout.css';

function Layout() {
  return (
    <div className="layout">
      <Header className="layout-header bordered" />
      <main className="layout-main bordered">
        <Outlet />
      </main>
      <Footer className="layout-footer bordered" />
    </div>
  );
}

export default Layout;
