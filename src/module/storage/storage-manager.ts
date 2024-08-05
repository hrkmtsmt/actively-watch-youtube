import { Setting, Channels } from '.';
import { storageKeyMap, StorageKeys } from './storage-key-map';

interface Storage<T extends StorageKeys> {
  [storageKeyMap.setting]: T extends typeof storageKeyMap.setting ? Setting : never;
  [storageKeyMap.channels]: T extends typeof storageKeyMap.channels ? Channels : never;
}

export class StorageManager<T extends StorageKeys> {
  private readonly key: T;

  constructor(key: T) {
    this.key = key;
  }

  public async get() {
    const data = (await chrome.storage.local.get(this.key)) as Storage<T>;

    return data[this.key];
  }

  public async set(value: Storage<T>[typeof this.key]) {
    await chrome.storage.local.set({ [this.key]: value });
  }
}
