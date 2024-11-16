import { client } from '..';
import * as Activities from './types';
import { QueryParams, toQueryString } from '@module/util';

export const activities = {
  /**
   * Document: https://developers.google.com/youtube/v3/docs/activities/list?hl=ja
   */
  list: async (query: Activities.GetQuery) => {
    const queryParams: QueryParams = {
      key: import.meta.env.VITE_YOUTUBE_API_KEY_BY_V3,
      channelId: query.channelId,
      part: 'contentDetails',
      maxResults: '50',
    };

    return client.get<Activities.GetResponse>(`/activities?${toQueryString(queryParams)}`);
  },
};
