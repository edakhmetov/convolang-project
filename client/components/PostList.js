import { useState, useEffect } from 'react';
import Post from "./Post";
import apiService from "../lib/api/apiService";
import PostForm from './PostForm';

const PostList = ({ user }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [])

  // console.log(user);

  const getPosts = async () => {
    const userPosts = await apiService.getUserPosts();
    // const followingPosts = await apiService.getFollowingPosts();
    // const orderedPosts = ()
    console.log(userPosts);
    setPosts([...userPosts]);
      // .then(posts => setPosts(posts));
  }

  return (
    <div>
      <PostForm getPosts={getPosts}/>
      {posts.length > 0 && posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  )
}

export default PostList
