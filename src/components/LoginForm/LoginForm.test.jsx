import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter
import LoginForm from './LoginForm'; // Tu componente
import { AuthProvider } from '../../context/AuthContext';
import React from 'react';

test('Debe renderizar el formulario de login', () => {
  render(
    <BrowserRouter>
      <AuthProvider> {/* Envolver en AuthProvider */}
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );

});
