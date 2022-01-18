import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import apiService from '../lib/api/apiService';
import { AuthContext } from '../lib/context/authContext';
import formStyles from '../styles/Form.module.css'


const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  nativeLanguages: '',
  learningLanguages: ''
}

const RegistrationForm = () => {
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();


  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isLoggedIn == true) router.push('/');
  }, [isLoggedIn])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const user = await apiService.register(formData);
    const res = await apiService.login({ username: formData.username, password: formData.password })
    // console.log(res);
    setIsLoggedIn(true);
    // router.push('/');
  }

  return (
    <div className='form-container'>
      <form className={formStyles.form} onSubmit={register}>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' name='firstName' onChange={handleChange} required />
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' name='lastName' onChange={handleChange} required />
        <label htmlFor='username'>username</label>
        <input type='text' name='username' onChange={handleChange} required />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' onChange={handleChange} required />
        <label htmlFor='nativeLanguages'>Native Languages</label>
        <input type='text' name='nativeLanguages' onChange={handleChange} required />
        <label htmlFor='learningLanguages'>Learning Languages</label>
        <input type='text' name='learningLanguages' onChange={handleChange} required />
        <input type='submit' />
      </form>
    </div>
  )
}

export default RegistrationForm
