/* eslint-disable no-console */
(async () => {
  const { api } = await import('@module/api');
  const { StorageManager } = await import('@module/storage');

  const channelStorage = new StorageManager('channels');

  (async () => {
    const res = await channelStorage.get();
    console.log(res);

    const response = await Promise.all(res.map((c) => api.youtube.activities.list({ channelId: c.id })));

    console.log(response);
  })();
})();
