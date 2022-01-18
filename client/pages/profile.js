import { useContext } from "react"
import { AuthContext } from "../lib/context/authContext"

const profile = () => {
  const {user} = useContext(AuthContext);


  return (
    <div>
      {user && <div>
        <h1>{user.firstName} {user.lastName}</h1>
        <h3>Followers: {user.followers.length}</h3>
        {/* {user.followers.map((u, index) => (
          <div key={index}>
            <h1>
              {u.firstName} {u.lastName}
            </h1>
          </div>
        ))} */}
        <h3>Followings: {user.followings.length}</h3>
      </div>}
    </div>
  )
}

export default profile
