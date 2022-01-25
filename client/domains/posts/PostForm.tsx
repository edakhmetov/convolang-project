import {
  useState,
  useContext,
  FormEvent,
  FormEventHandler,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import apiService from '../../lib/api/apiService';
import styles from '../../styles/Post.module.css';

const initialState = {
  content: '',
};

type PostFormProps = {
  getPosts: Function;
};

const PostForm = ({ getPosts }: PostFormProps) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange: ChangeEventHandler = (e: ChangeEvent) => {
    const { name, value } = e.target as typeof e.target & {
      name: string;
      value: string;
    };
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    await apiService.createPost(formData);
    setFormData(initialState);
    getPosts();
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label className={styles.formLabel} htmlFor="content">
        Create a post
      </label>
      <input
        className={styles.formInput}
        type="textarea"
        name="content"
        value={formData.content}
        autoComplete="off"
        required={true}
        placeholder="Share something..."
        onChange={handleChange}
      />
      <input className={styles.formButton} type="submit" />
    </form>
  );
};

export default PostForm;
