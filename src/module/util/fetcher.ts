import camelcaseKeys from 'camelcase-keys';

class ExternalSystemError extends Error {
  private body?: unknown;

  constructor(error?: unknown) {
    super();
    this.name = 'EXTERNAL_SYSTEM_ERROR';
    this.message = '外部システムとの連携に失敗しました';
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
    this.message = 'システムエラーが発生しました';
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

const generateURL = (baseURL: string) => (path: string) => `${baseURL}${path}`;

export const createClient = (baseURL: string, headers?: Headers) => {
  const toURL = generateURL(baseURL);

  return {
    get: async <T>(path: string): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.get, undefined, headers);
    },
    post: async <T, U>(path: string, body?: U): Promise<T> => {
      return fetcher(toURL(path), HTTP_METHODS.post, body, headers);
    },
  };
};
