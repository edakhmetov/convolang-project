import Nav from '../components/Nav';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
