type A<T extends Record<keyof T, T[keyof T]>> = Record<string, T>;

export const toArrayFromMap = <T extends Record<keyof T, T[keyof T]>>(map: A<T>) => {
  return Object.entries(map).map(([_, value]) => value);
};
