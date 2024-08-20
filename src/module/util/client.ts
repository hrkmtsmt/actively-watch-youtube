import camelcaseKeys from 'camelcase-keys';

class ExternalSystemError extends Error {
  private body?: unknown;

  constructor(error?: unknown) {
    super();
    this.name = 'EXTERNAL_SYSTEM_ERROR';
    this.message = 'External system error.';
    this.body = error;
    console.error(this.body);
  }
}

const isExternalSystemError = (error: unknown): error is ExternalSystemError => {
  return error instanceof ExternalSystemError;
};

class InternalSystemError extends Error {
  private body?: unknown;

  constructor(error?: unknown) {
    super();
    this.name = 'INTERNAL_SYSTEM_ERROR';
    this.message = 'Internal system error.';
    this.body = error;
    console.error(this.body);
  }
}

const isInternalSystemError = (error: unknown): error is InternalSystemError => {
  return error instanceof InternalSystemError;
};

export type HttpClientError = ExternalSystemError | InternalSystemError;

export const isHttpClientError = (error: unknown): error is HttpClientError => {
  return isExternalSystemError(error) || isInternalSystemError(error);
};

export const HTTP_METHODS = {
  get: 'GET',
  post: 'POST',
} as const;

type HttpMethods = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

const createBody = <U>(body?: U) => {
  if (!body) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  return JSON.stringify(body);
};

type Headers = Record<string, string>;

const fetcher = async <T, U>(url: string, method: HttpMethods, body?: U, headers?: Headers): Promise<T> => {
  try {
    const response = await fetch(url, {
      mode: 'cors',
      method,
      body: createBody<U>(body),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    if (response.ok) {
      return camelcaseKeys(data as never, { deep: true }) as T;
    }

    throw new ExternalSystemError(data);
  } catch (error: unknown) {
    if (isExternalSystemError(error)) {
      throw error;
    }

    throw new InternalSystemError({ url, error });
  }
};

export class Client {
  private BASE_URL: string;

  private headers?: Headers;

  constructor(baseURL: string, headers?: Headers) {
    this.BASE_URL = baseURL;
    this.headers = headers;
  }

  private toURL(path: string) {
    return `${this.BASE_URL}${path}`;
  }

  public async get<T>(path: string): Promise<T> {
    return fetcher(this.toURL(path), HTTP_METHODS.get, undefined, this.headers);
  }

  public async post<T, U>(path: string, body?: U): Promise<T> {
    return fetcher(this.toURL(path), HTTP_METHODS.post, body, this.headers);
  }
}
