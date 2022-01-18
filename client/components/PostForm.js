import { useState, useContext } from 'react';
import { AuthContext } from '../lib/context/authContext';
import apiService from '../lib/api/apiService';
import styles from '../styles/Post.module.css'

const initialState = {
  content: '',
}

const PostForm = ({ getPosts }) => {

  const { user } = useContext(AuthContext);

  // const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiService.createPost(formData);
    setFormData(initialState);
    getPosts();
  }



  return (
    // <div>
    // </div>
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label
        className={styles.formLabel}
        htmlFor='content'
      >
        Create a post
      </label>
      <input
        className={styles.formInput}
        type='textarea'
        name='content'
        value={formData.content}
        autoComplete='off'
        required='true'
        onChange={handleChange}
      />
      <input
        className={styles.formButton}
        type='submit'
      />
    </form>
  )
}

export default PostForm;