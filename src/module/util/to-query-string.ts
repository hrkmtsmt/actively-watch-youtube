export interface QueryParam {
  key: string;
  value: string | string[];
}

const toStringFromArray = (array: string[]) => array.join(',');

export const toQueryString = (queryParams: QueryParam[]) => {
  const searchParams = new URLSearchParams();
  queryParams.forEach(({ key, value }) =>
    searchParams.set(key, Array.isArray(value) ? toStringFromArray(value) : value)
  );

  return searchParams.toString();
};
