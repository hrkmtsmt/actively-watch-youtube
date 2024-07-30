export interface GetQuery {
  channelIds: string[];
}

export interface GetResponse {
  kind: string;
  etag: string;
  pageInfo: { totalResults: number; resultPerPage: number };
  items: {
    kind: string;
    id: string;
    etag: string;
    snippet: {
      title: string;
      customUrl: string;
      description: string;
      publishedAt: string;
      localized: { title: string; description: string };
      thumbnails: {
        default: { width: 88; height: 88; url: string };
        high: { width: 800; height: 800; url: string };
        medium: { width: 240; height: 240; url: string };
      };
    };
  }[];
}
