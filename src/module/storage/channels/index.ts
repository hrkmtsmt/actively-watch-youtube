import { create } from 'zustand';
import { produce } from 'immer';
import { LocalStorageManager } from '../local-storage-manager';
import { Api } from '@module/api';

export type Channels = Api.YouTube.Channels.GetResponse['items'];

interface Store {
  channels: Channels;
  initialize: () => Promise<void>;
  add: (channelId: Channels[number]['id'], channel: Channels[number]) => Promise<void>;
  remove: (channelId: Channels[number]['id']) => Promise<void>;
}

export const useChannelsStore = create<Store>()((set) => {
  const storage = new LocalStorageManager('channels');
  return {
    channels: [],
    initialize: async () => {
      const value = await storage.get();
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.channels = value ?? [];
        });
      });
    },
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
  };
});
