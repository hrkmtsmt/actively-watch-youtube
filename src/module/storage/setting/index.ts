import { create } from 'zustand';
import { produce } from 'immer';
import { StorageManager } from '../storage-manager';

interface Setting {
  apiKey: string;
}

interface Store {
  mode: 'edit' | 'none';
  current: Setting;
  prev: Setting;
  change: (updater: (current: Setting) => typeof current) => void;
  start: () => void;
  save: () => void;
  cancel: () => void;
}

const storage = new StorageManager<Setting>('setting');
const initialState: Setting = { apiKey: '' };
const savedState = await storage.get();

export const useSettingStore = create<Store>()((set) => ({
  mode: 'none',
  current: savedState ?? initialState,
  prev: savedState ?? initialState,
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
}));
