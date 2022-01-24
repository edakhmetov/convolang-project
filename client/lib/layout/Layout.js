import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
