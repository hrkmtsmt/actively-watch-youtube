import { client } from '..';
import * as Activities from './types';
import { QueryParam, toQueryString } from '@module/util';

export const activities = {
  /**
   * Document: https://developers.google.com/youtube/v3/docs/activities/list?hl=ja
   */
  list: async (query: Activities.GetQuery) => {
    const queryParams: QueryParam[] = [
      { key: 'key', value: import.meta.env.VITE_YOUTUBE_API_KEY_BY_V3 },
      { key: 'part', value: 'contentDetails' },
      { key: 'channelId', value: query.channelId },
      { key: 'maxResults', value: '50' },
    ];

    return client.get<Activities.GetResponse>(`/activities?${toQueryString(queryParams)}`);
  },
};
