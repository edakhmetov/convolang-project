import { useState, useEffect } from 'react';
import Post from "./Post";
import apiService from "../lib/api/apiService";
import PostForm from './PostForm';

const PostList = ({ user }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = () => {
    apiService.getUserPosts()
      .then(posts => setPosts(posts));
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
