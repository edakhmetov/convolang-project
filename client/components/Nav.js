import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav>
      <h1>
        <Link href="/">Convolang</Link>
      </h1>
      <ul>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
