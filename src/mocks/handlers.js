import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;

    // Usuario simulado (puedes ajustar los valores)
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

  http.get('/api/profile', ({ request }) => {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '').trim();

    if (token === 'fake-token-123') {
      return HttpResponse.json({
        email: 'test@test.com',
        name: 'Usuario Test',
      });
    }

    return HttpResponse.json(
      { message: 'No autorizado' },
      { status: 401 }
    );
  }),
];
