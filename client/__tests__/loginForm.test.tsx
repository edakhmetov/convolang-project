import LoginForm from '../domains/login/LoginForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../lib/api/apiService', () => ({
  login: () => ({accessToken: 'accessToken'})
}));

it('should have username and password fields', () => {
  const usernameInput = screen.getByRole('input', { name: 'username' })
  const passwordInput = screen.getByRole('input', { name: 'password' })
});


//   render(<LoginForm />);
//   expect(usernameInput.toBeInTheDocument());
// });

// it('should call handleSubmit with form data', async () => {
//   const handleSubmit = jest.fn();

//   const accessToken = { accessToken: 'accessToken' };
//   render(<LoginForm />);

//   const usernameInput = screen.getByLabelText(/username/i);
//   const passwordInput = screen.getByLabelText(/password/i);
//   const submitButton = screen.getByRole('input', { name: 'submitBtn' });

//   userEvent.type(usernameInput, 'johndoe');
//   userEvent.type(passwordInput, 'password');

//   await userEvent.click(submitButton);

//   expect(handleSubmit).toHaveBeenCalledWith()
// });