import { useState, useEffect } from 'react';
import SinglePost from './SinglePost';
import apiService from '../../lib/api/apiService';
import PostForm from './PostForm';
import styles from '../../styles/List.module.css';
import useFetch from '../../lib/hooks/useFetch';
import User from '../../lib/types/User';
import Post from '../../lib/types/Post';

type PostListProps = {
  passedPosts?: Post[];
};

const PostList = ({ passedPosts }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (passedPosts) setPosts(passedPosts);
    else getPosts();
  }, []);

  const getPosts = async () => {
    const userPosts = await apiService.getUserPosts();
    setPosts([...userPosts]);
  };

  return (
    <div className={styles.container}>
      {!passedPosts && <PostForm getPosts={getPosts} />}
      {posts.length > 0 &&
        posts.map((post) => <SinglePost post={post} key={post.id} />)}
    </div>
  );
};

export default PostList;
