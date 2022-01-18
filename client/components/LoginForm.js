import { useState, useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import { AuthContext } from '../lib/context/authContext';
import apiService from "../lib/api/apiService";
import formStyles from '../styles/Form.module.css'

const initialState = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (isLoggedIn == true) router.push('/');
  }, [isLoggedIn])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiService.login(formData);
    if (!data.error) {
      // localStorage.setItem('accessToken', data.accessToken);
      // this will re-render navbar to display needed links
      setIsLoggedIn(true);
      // this will send a user to '/' route
      // router.push('/');
    }
    setFormData(initialState);
  }



  return (
    <div className={formStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <input type="submit" />
      </form>
    </div>
  )
}

export default LoginForm
