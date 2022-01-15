import { useState } from "react";

const initialState = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
    console.log(formData);
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
    const user = await res.json();
    console.log(user);
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
