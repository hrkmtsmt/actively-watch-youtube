/* eslint-disable no-console */
import { api } from '@module/api';
import { StorageManager } from '@module/storage';

const channelStorage = new StorageManager('channels');

const res = await channelStorage.get();

const response = res.map((c) => api.youtube.activities.list({ channelId: c.id }));

console.log(response);
