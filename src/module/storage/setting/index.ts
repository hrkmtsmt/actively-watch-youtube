import { create } from 'zustand';
import { produce } from 'immer';
import { LocalStorageManager } from '../local-storage-manager';

export interface Setting {
  apiKey: string;
}

interface Store {
  mode: 'edit' | 'none';
  current: Setting;
  prev: Setting;
  initialize: () => Promise<void>;
  change: (updater: (current: Setting) => typeof current) => void;
  start: () => void;
  save: () => void;
  cancel: () => void;
}

const initialState: Setting = { apiKey: '' };

export const useSettingStore = create<Store>()((set) => {
  const storage = new LocalStorageManager('setting');
  return {
    mode: 'none',
    current: initialState,
    prev: initialState,
    initialize: async () => {
      const value = await storage.get();
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.current = value ?? initialState;
          draftState.prev = value ?? initialState;
        });
      });
    },
    start: () => {
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.mode = 'edit';
        });
      });
    },
    change: (updater) => {
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.current = updater(state.current);
        });
      });
    },
    save: async () => {
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.prev = state.current;
          draftState.mode = 'none';
          storage.set(state.current);
        });
      });
    },
    cancel: () => {
      return set((state) => {
        return produce(state, (draftState) => {
          draftState.current = draftState.prev;
          draftState.mode = 'none';
        });
      });
    },
  };
});
