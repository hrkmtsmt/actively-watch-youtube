import { client } from '..';
import * as Channels from './types';
import { QueryParams, toQueryString } from '@module/util';

export const channels = {
  /**
   * Document: https://developers.google.com/youtube/v3/docs/channels/list?hl=ja
   */
  list: async (query: Channels.GetQuery) => {
    const queryParams: QueryParams = {
      key: import.meta.env.VITE_YOUTUBE_API_KEY_BY_V3,
      part: ['snippet'],
      id: query.channelIds,
      maxResults: '50',
    };

    return client.get<Channels.GetResponse>(`/channels?${toQueryString(queryParams)}`);
  },
};
