import { useContext } from "react"
import { AuthContext } from "../lib/context/authContext"
import PostList from "../components/PostList";
import useFetch from '../lib/hooks/useFetch';
import UserInfo from "../components/UserInfo";


const profile = () => {
  
  const { user } = useContext(AuthContext);


  if (user) {
    user.posts = user.posts.map(post => {
      post.owner = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id
      }
      return post
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
