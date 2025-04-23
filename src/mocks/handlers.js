import { rest } from 'msw';

export const handlers = [
  rest.get('/api/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ name: 'Usuario Test', email: 'test@test.com' })
    );
  }),

  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@test.com' && password === '12345678') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'fake-token-123',
          user: { email, name: 'Usuario Test' },
        })
      );
    }
    return res(
      ctx.status(401),
      ctx.json({ message: 'Credenciales incorrectas' })
    );
  })
];
