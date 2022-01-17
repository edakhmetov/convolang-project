import { useContext } from 'react'
import { AuthContext } from '../lib/context/authContext'

const home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user && user.firstName}</h1>
    </div>
  )
}

export default home
