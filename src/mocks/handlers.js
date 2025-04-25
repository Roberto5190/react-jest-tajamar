import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/profile', () => {
    return HttpResponse.json({ name: 'Usuario Test', email: 'test@test.com' });
  }),

  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'test@test.com' && password === '12345678') {
      return HttpResponse.json({
        token: 'fake-token-123',
        user: { email, name: 'Usuario Test' },
      });
    }

    return HttpResponse.json(
      { message: 'Credenciales incorrectas' },
      { status: 401 }
    );
  }),
];
