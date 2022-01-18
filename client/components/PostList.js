import { useState, useEffect } from 'react';
import Post from "./Post";
import apiService from "../lib/api/apiService";
import PostForm from './PostForm';
import styles from '../styles/List.module.css';

const PostList = ({ user }) => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [])

  // console.log(user);

  const getPosts = async () => {
    const userPosts = await apiService.getUserPosts();
    setPosts([...userPosts]);
  }

  return (
    <div className={styles.container}>
      <PostForm getPosts={getPosts}/>
      {posts.length > 0 && posts.map((post) => (
        <Post post={post} key={post.id} url={`/post/${post.id}`}/>
      ))}
    </div>
  )
}

export default PostList
