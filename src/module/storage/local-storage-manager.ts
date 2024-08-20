import { Setting, Channels } from '.';

const list = ['setting', 'channels'] as const;

if (list.length !== new Set(list).size) {
  throw new Error('Duplicated storage key.');
}

type StorageKeys = { [Key in (typeof list)[number]]: Key };

const STORAGE_KEYS = list.reduce<StorageKeys>((acc, key) => ({ ...acc, [key]: key }), {} as StorageKeys);

interface Storage<T extends keyof StorageKeys> {
  [STORAGE_KEYS.setting]: T extends typeof STORAGE_KEYS.setting ? Setting | undefined : never;
  [STORAGE_KEYS.channels]: T extends typeof STORAGE_KEYS.channels ? Channels | undefined : never;
}

export class LocalStorageManager<T extends keyof StorageKeys> {
  private readonly key: T;

  constructor(key: T) {
    this.key = key;
  }

  public async get() {
    const data = (await browser.storage.local.get(this.key)) as Storage<T>;

    return data[this.key];
  }

  public async set(value: Storage<T>[typeof this.key]) {
    await browser.storage.local.set({ [this.key]: value });
  }
}
