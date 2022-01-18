import { useState, useContext } from "react";
import { AuthContext } from '../lib/context/authContext';
import apiService from "../lib/api/apiService";

const initialState = {
  content: '',
}

const PostForm = ({getPosts}) => {

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
    // if (!data.error) {
    //   // localStorage.setItem('accessToken', data.accessToken);
    //   // this will send a user to '/' route
    //   router.push('/home');
    //   // this will re-render navbar to display needed links
    // }
    setFormData(initialState);
    getPosts();
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='content'>Content</label>
        <input type="textarea" name="content" value={formData.content} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default PostForm;