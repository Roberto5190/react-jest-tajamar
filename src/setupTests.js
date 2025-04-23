import '@testing-library/jest-dom';
import { server } from './mocks/server'; // Si estás usando MSW

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
