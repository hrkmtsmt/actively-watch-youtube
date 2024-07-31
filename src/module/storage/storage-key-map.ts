const list = ['setting', 'channel-id'] as const;

if (list.length !== new Set(list).size) {
  throw new Error('Duplicated storage key.');
}

export type StorageKeys = (typeof list)[number];

export type StorageKeyMap = { [Key in StorageKeys]: Key };

export const storageKeyMap = list.reduce<StorageKeyMap>((acc, key) => ({ ...acc, [key]: key }), {} as StorageKeyMap);
