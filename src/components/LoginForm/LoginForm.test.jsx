import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('Debe renderizar el formulario de login', () => {
  render(<LoginForm />);
  const loginButton = screen.getByText(/Iniciar sesión/i);
  expect(loginButton).toBeInTheDocument();
});
