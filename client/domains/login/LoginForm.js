import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../lib/context/AuthContext';
import apiService from '../../lib/api/apiService';
import styles from '../../styles/Form.module.css';

const initialState = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const { user, setUser } = useContext(AuthContext);

  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiService.login(formData);
    setUser(await apiService.getUserInfo());
    if (!data.error) {
      router.push('/');
    } else {
      alert(data.message);
      setFormData(initialState);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Login</h1>
      <label className={styles.label} htmlFor="username">
        Username
      </label>
      <input
        required
        autoComplete="off"
        className={styles.input}
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        required
        autoComplete="off"
        className={styles.input}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input className={styles.button} type="submit" />
    </form>
  );
};

export default LoginForm;
