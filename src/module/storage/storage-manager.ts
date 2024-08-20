import { Setting, Channels } from '.';
import { storageKeyMap, StorageKeys } from './storage-key-map';

interface Storage<T extends StorageKeys> {
  [storageKeyMap.setting]: T extends typeof storageKeyMap.setting ? Setting | undefined : never;
  [storageKeyMap.channels]: T extends typeof storageKeyMap.channels ? Channels | undefined : never;
}

export class StorageManager<T extends StorageKeys> {
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
