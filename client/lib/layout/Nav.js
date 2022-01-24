import Link from 'next/link';

import NavLinks from './NavLinks';

import navStyles from '../../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <h1>
        <Link href="/">Convolang</Link>
      </h1>
      <div className={navStyles.links}>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Nav;
