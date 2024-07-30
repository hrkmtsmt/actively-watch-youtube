import { client } from '..';
import * as Channels from './types';
import { QueryParam, toQueryString } from '@module/util';

export const channels = {
  /**
   * Document: https://developers.google.com/youtube/v3/docs/channels/list?hl=ja
   */
  list: async (query: Channels.GetQuery) => {
    const queryParams: QueryParam[] = [
      { key: 'key', value: import.meta.env.VITE_YOUTUBE_API_KEY_BY_V3 },
      { key: 'part', value: ['snippet'] },
      { key: 'id', value: query.channelIds },
      { key: 'maxResults', value: '50' },
    ];

    return client.get<Channels.GetResponse>(`/channels?${toQueryString(queryParams)}`);
  },
};
