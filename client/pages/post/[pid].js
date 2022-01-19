import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import apiService from '../../lib/api/apiService';
import moment from 'moment';
import Post from '../../components/Post';
import postStyles from '../../styles/Post.module.css';
import listStyles from '../../styles/List.module.css';

const initState = {
  content: '',
  owner: {
    firstName: 'fake',
    lastName: 'user'
  },
  createdAt: Date.now()
}

const postPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(initState);

  useEffect(() => {
    if (pid) getPost();
  }, [pid]);

  const getPost = async () => {
    const foundPost = await apiService.getPost(pid);
    // console.log(foundPost);
    setPost(foundPost);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, comment]);
    setComment(initState);
  }

  return (
    <div className={listStyles.container}>
      {post &&
        <div className={postStyles.container}>
          <p className={postStyles.creator}>Posted by {post.owner.firstName} {post.owner.lastName} on {moment(post.createdAt).format('MMMM Do, YYYY')}</p>
          <p className={postStyles.content}>{post.content}</p>
        </div>
      }
      <form onSubmit={handleSubmit} className={postStyles.formContainer}>
        <input onChange={handleChange} className={postStyles.formInput} type='text' name='content' autoComplete='off' value={comment.content} required placeholder='Add a comment' />
        <input className={postStyles.formButton} type='submit' value='post' />
      </form>
      <h1 className={postStyles.commentsTitle}>Comments</h1>
      {comments.length > 0 &&
        comments.map((c, index) => (
          <div className={postStyles.container} key={index}>
            <p className={postStyles.creator}>{c.owner.firstName} {c.owner.lastName} commented on {moment(c.createdAt).format('MMMM Do, YYYY')}</p>
            <p className={postStyles.content}>{c.content}</p>
          </div>
        ))
      }
      {comments.length === 0 &&
        <h1 className={postStyles.noComments} >No comments yet</h1>
      }
    </div>
  )
}

export default postPage
