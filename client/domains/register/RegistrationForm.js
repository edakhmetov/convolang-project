import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import apiService from '../../lib/api/apiService';
import { AuthContext } from '../../lib/context/AuthContext';
import styles from '../../styles/Form.module.css';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  nativeLanguages: '',
  learningLanguages: '',
};

const RegistrationForm = () => {
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isLoggedIn == true) router.push('/');
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const user = await apiService.register(formData);
    const res = await apiService.login({
      username: formData.username,
      password: formData.password,
    });
    // console.log(res);
    setIsLoggedIn(true);
    // router.push('/');
  };

  return (
    <form className={styles.form} onSubmit={register}>
      <h1 className={styles.title}>Register</h1>
      <label className={styles.label} htmlFor="firstName">
        First Name
      </label>
      <input
        className={styles.input}
        type="text"
        name="firstName"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <label className={styles.label} htmlFor="lastName">
        Last Name
      </label>
      <input
        className={styles.input}
        type="text"
        name="lastName"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <label className={styles.label} htmlFor="username">
        Username
      </label>
      <input
        className={styles.input}
        type="text"
        name="username"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        className={styles.input}
        type="password"
        name="password"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <label className={styles.label} htmlFor="nativeLanguages">
        Native Language
      </label>
      <input
        className={styles.input}
        type="text"
        name="nativeLanguages"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <label className={styles.label} htmlFor="learningLanguages">
        Learning Language
      </label>
      <input
        className={styles.input}
        type="text"
        name="learningLanguages"
        onChange={handleChange}
        required
        autoComplete="off"
      />
      <input className={styles.button} type="submit" value="register" />
    </form>
  );
};

export default RegistrationForm;
