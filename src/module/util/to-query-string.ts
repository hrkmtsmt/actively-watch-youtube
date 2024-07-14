export interface QueryParam {
  key: string;
  value: string;
}

export const toQueryString = (queryParams: QueryParam[]) => {
  const searchParams = new URLSearchParams();
  queryParams.forEach(({ key, value }) => searchParams.set(key, value));

  return searchParams.toString();
};
