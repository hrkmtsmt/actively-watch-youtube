type A<T extends Record<keyof T, T[keyof T]>> = Record<string, T>;

export const toArrayFromMap = <T extends Record<keyof T, T[keyof T]>>(map: A<T>) => {
  return Object.entries(map).reduce<{ keys: (keyof typeof map)[]; values: (typeof map)[string][] }>(
    (acc, [key, value]) => ({ keys: [...acc.keys, key], values: [...acc.values, value] }),
    { keys: [], values: [] }
  );
};
