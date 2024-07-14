export interface GetQuery {
  channelId: string;
}

export interface GetResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultPerPage: number;
  };
  items: {
    kind: string;
    id: string;
    etag: string;
    contentDetails: {
      upload: {
        videoId: string;
      };
    }[];
  }[];
}
