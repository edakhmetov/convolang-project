import { useContext } from "react"
import { AuthContext } from "../lib/context/authContext"
import PostList from "../components/PostList";
import UserInfo from "../components/UserInfo";

const profile = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    user.posts = user.posts.map(p => {
      p.owner = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      }
      return p
    });
  }

  return (
    <>
      {user &&
        <div>
          <UserInfo user={user} />
          <PostList passedPosts={user.posts} />
        </div>
      }
    </>
  )
}

export default profile
