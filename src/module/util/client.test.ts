import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { HttpResponse, RequestHandler, http } from 'msw';
import { setupServer } from 'msw/node';
import { Client } from './client';

const BASE_URL = 'https://example.com/api' as const;

const handlers: RequestHandler[] = [
  http.post(`${BASE_URL}/users`, async ({ request }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await request.json()) as any;
    return HttpResponse.json({ id: 2, ...body }, { status: 201 });
  }),
  http.get(`${BASE_URL}/users/:id`, ({ params }) => {
    return HttpResponse.json({ id: Number(params.id), name: 'user', email: 'user@example.com' }, { status: 200 });
  }),
  http.get(`${BASE_URL}/books`, () => {
    return HttpResponse.json({ message: 'Not Found.' }, { status: 404 });
  }),
  http.post(`${BASE_URL}/books`, () => {
    return HttpResponse.text('Register book.', { status: 404 });
  }),
];

const server = setupServer(...handlers);

const client = new Client(BASE_URL);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Client class', () => {
  test('HTTP GET Request is success.', async () => {
    const result = await client.get('/users/1');
    expect(result).toStrictEqual({ id: 1, name: 'user', email: 'user@example.com' });
  });

  test('HTTP GET Request is external system error.', async () => {
    const client = new Client(BASE_URL);
    expect(() => client.get('/books')).rejects.toThrowError('External system error.');
  });

  test('HTTP GET Request is internal system error.', async () => {
    const client = new Client(BASE_URL);
    expect(() => client.post('/books')).rejects.toThrowError('Internal system error.');
  });

  test('HTTP POST Request is success.', async () => {
    const result = await client.post('/users', { name: 'aklo', email: 'aklo@example.com' });
    expect(result).toStrictEqual({ id: 2, name: 'aklo', email: 'aklo@example.com' });
  });
});
