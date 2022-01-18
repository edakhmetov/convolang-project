import moment from 'moment';
import Link from 'next/link';
import postStyles from '../styles/Post.module.css'

const Post = ({ post }) => {

  return (
    <Link href={`/post/${post.id}`}>
      <div className={`${postStyles.container} ${postStyles.main}`}>
        <p className={postStyles.creator}>Posted by {post.owner.firstName} {post.owner.lastName} on {moment(post.createdAt).format('MMMM Do, YYYY')}</p>
        <p className={postStyles.content}>{post.content}</p>
      </div>
    </Link>
  )
}

export default Post
