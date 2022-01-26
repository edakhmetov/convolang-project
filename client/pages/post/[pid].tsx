import { useRouter } from 'next/router';
import {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from 'react';
import apiService from '../../lib/api/apiService';
import moment from 'moment';
import postStyles from '../../styles/Post.module.css';
import listStyles from '../../styles/List.module.css';
import Post from '../../lib/types/Post';
import Comment from '../../lib/types/Comment';

const initState = {
  content: '',
  owner: {
    firstName: '',
    lastName: '',
  },
  createdAt: new Date(),
};

const postPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  const postId = Number(pid);
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState(initState);

  useEffect(() => {
    if (postId) getPost();
  }, [postId]);


  const getPost = async () => {
    const foundPost = await apiService.getPost(postId);
    setPost(foundPost);
  };

  const handleChange: ChangeEventHandler = (e: ChangeEvent) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    setComment({ ...comment, [name]: value });
  };

  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    await apiService.createComment(comment, postId)
    setPost(await apiService.getPost(postId));
    setComment(initState);
  };

  return (
    <div className={listStyles.container}>
      {post && (
        <div className={postStyles.container}>
          <p className={postStyles.creator}>
            Posted by {post.owner.firstName} {post.owner.lastName} on{' '}
            {moment(post.createdAt).format('MMMM Do, YYYY')}
          </p>
          <p className={postStyles.content}>{post.content}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={postStyles.formContainer}>
        <input
          onChange={handleChange}
          className={postStyles.formInput}
          type="text"
          name="content"
          autoComplete="off"
          value={comment.content}
          required
          placeholder="Add a comment"
        />
        <input className={postStyles.formButton} type="submit" value="post" />
      </form>
      <h1 className={postStyles.commentsTitle}>Comments</h1>
      {(post && post.comments.length > 0) &&
        post.comments.map((c, index) => (
          <div className={postStyles.container} key={index}>
            <p className={postStyles.creator}>
              {c.owner.firstName} {c.owner.lastName} commented on{' '}
              {moment(c.createdAt).format('MMMM Do, YYYY')}
            </p>
            <p className={postStyles.content}>{c.content}</p>
          </div>
        ))}
      {(post && post.comments.length === 0) && (
        <h1 className={postStyles.noComments}>No comments yet</h1>
      )}
    </div>
  );
};

export default postPage;
