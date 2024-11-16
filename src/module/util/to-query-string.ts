export type QueryParams = Record<string, string | string[]>;

type ToQueryString = (queryParams: QueryParams) => string;

export const toQueryString: ToQueryString = (queryParams) => {
  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.set(`${key}[]`, value.join(','));
    } else {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
};
