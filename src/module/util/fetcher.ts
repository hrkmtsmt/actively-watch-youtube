import camelcaseKeys from 'camelcase-keys';

class FailedFetchError extends Error {
  constructor(cause?: unknown) {
    super();
    this.name = 'FAILED_FETCH_ERROR';
    this.message = 'データ取得に失敗しました';
    console.error(cause);
  }
}

const isFailedFetchError = (error: unknown): error is FailedFetchError => {
  return error instanceof FailedFetchError;
};

class SystemError extends Error {
  constructor(cause?: unknown) {
    super();
    this.name = 'SYSTEM_ERROR';
    this.message = 'システムエラーです';
    console.error(cause);
  }
}

const isSystemError = (error: unknown): error is SystemError => {
  return error instanceof SystemError;
};

export type HttpClientError = FailedFetchError | SystemError;

export const isHttpClientError = (error: unknown): error is HttpClientError => {
  return isFailedFetchError(error) || isSystemError(error);
};

type Headers = Record<string, string>;

export const fetcher = async <T>(url: string, headers?: Headers): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.status === 204) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      return undefined as void as T;
    }

    const data = await response.json();

    if (response.ok) {
      return camelcaseKeys(data as never, { deep: true }) as T;
    }

    throw new FailedFetchError();
  } catch (error: unknown) {
    if (isFailedFetchError(error)) {
      throw error;
    }

    throw new SystemError({ url, error });
  }
};
