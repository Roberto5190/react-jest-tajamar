// Dashboard.test.jsx - Ejemplos de tests a implementar
describe('Dashboard', () => {
    // 1. Protección de ruta
    test('redirige a login sin autenticación')
    
    // 2. Datos de usuario
    test('muestra información del usuario')
    
    // 3. Logout
    test('permite cerrar sesión')

    test('muestra error con email inválido', async () => {
        // 1. Renderizar el componente
        render(<LoginForm />);
        
        // 2. Obtener elementos
        const emailInput = screen.getByLabelText(/email/i);
        
        // 3. Interactuar
        await userEvent.type(emailInput, 'correo-invalido');
        
        // 4. Verificar resultado
        expect(screen.getByText(/email no válido/i)).toBeInTheDocument();
      });
});