import { create } from 'zustand';
import { produce } from 'immer';
import { StorageManager } from '../storage-manager';
import { Api } from '@module/api';

export type Channels = Api.YouTube.Channels.GetResponse['items'];

interface Store {
  channels: Channels;
  add: (channelId: Channels[number]['id'], channel: Channels[number]) => Promise<void>;
  remove: (channelId: Channels[number]['id']) => Promise<void>;
}

const storage = new StorageManager('channels');
const storageValue = await storage.get();

export const useChannelsStore = create<Store>()((set) => ({
  channels: storageValue ?? [],
  add: async (channelId, channel) => {
    return set((state) => {
      return produce(state, (draftState) => {
        if (!state.channels.find((c) => c.id === channelId)) {
          const next = [...draftState.channels, channel];
          draftState.channels = next;
          storage.set(next);
        }
      });
    });
  },
  remove: async (channelId) => {
    return set((state) => {
      return produce(state, (draftState) => {
        const next = state.channels.filter((c) => c.id !== channelId);
        draftState.channels = next;
        storage.set(next);
      });
    });
  },
}));
