import { useState } from "react";
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../lib/context/authContext';
import apiService from "../lib/api/apiService";

const initialState = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const { setIsLoggedIn } = useContext(AuthContext);

  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiService.login(formData);
    if (!data.error) {
      // localStorage.setItem('accessToken', data.accessToken);
      // this will send a user to '/' route
      router.push('/home');
      // this will re-render navbar to display needed links
      setIsLoggedIn(true);
    }
    setFormData(initialState);
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
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
