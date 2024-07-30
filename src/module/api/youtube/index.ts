import { createClient } from '@module/util';
import { activities } from './activities';
import { channels } from './channels';

export const client = createClient(import.meta.env.VITE_YOUTUBE_API_BASE_URL_BY_V3);

export const youtube = {
  activities,
  channels,
};
