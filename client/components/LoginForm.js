import { useState } from "react";
import { useRouter } from 'next/router';

const initialState = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const router = useRouter();


  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // const user = await res.json();
    // console.log(user);
    // I will receive JWT back from the request and save it to localstorage
    const data = await res.json();
    console.log(data);
    if (!data.error) {
      localStorage.setItem('accessToken', data.accessToken);
      // this will send a user to '/' route
      router.push('/');
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
