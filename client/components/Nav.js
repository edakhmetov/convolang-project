import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../lib/context/authContext';
import navStyles from '../styles/Nav.module.css';


// now, the JWT token is accessible from the localstorage, use useEffect to send request on each page and to confirm that JWT is valid and user is signed in

// instead of checking

const Nav = () => {

  const user = useContext(AuthContext);

  console.log(user);

  return (
    <nav>
      <h1>
        <Link href='/'>Convolang</Link>
      </h1>
      <ul>
        <li>
          <Link href='/register'>Register</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
