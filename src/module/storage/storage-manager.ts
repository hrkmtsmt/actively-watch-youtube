import { StorageKeys } from './storage-key-map';

type StorageItem<T> = Record<StorageKeys, T>;

export class StorageManager<T> {
  private readonly key: StorageKeys;

  constructor(key: StorageKeys) {
    this.key = key;
  }

  public async get() {
    const data = (await chrome.storage.local.get(this.key)) as StorageItem<T | undefined>;

    return data[this.key];
  }

  public async set(value: T) {
    await chrome.storage.local.set({ [this.key]: value });
  }
}
