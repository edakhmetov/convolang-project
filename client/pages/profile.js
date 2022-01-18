import { useContext } from "react"
import { AuthContext } from "../lib/context/authContext"
import PostList from "../components/PostList";

const profile = () => {
  const {user} = useContext(AuthContext);

  if (user) {
    user.posts = user.posts.map(p => {
      p.owner = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      }
      return p
    });
    // console.log(user);
  }

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
        <h3>Posts: {user.posts.length}</h3>
        <PostList passedPosts={user.posts}/>
      </div>
      }
    </div>
  )
}

export default profile
