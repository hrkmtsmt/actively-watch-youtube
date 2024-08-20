import { StorageManager } from '@module/storage';
import { api } from '@module/api';

export default defineContentScript({
  matches: ['https://www.google.com/*', 'https://www.youtube.com/*'],
  async main() {
    const channels = await new StorageManager('channels').get();

    if (!channels) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    const videoId = searchParams.get('v');

    if (!videoId) {
      return;
    }

    const observer = new MutationObserver(() => {
      channels.forEach(async (channel) => {
        const response = await api.youtube.activities.list({ channelId: channel.id });

        const canWatch = response.items.find((item) => item.contentDetails.upload?.videoId === videoId);

        if (!canWatch) {
          // eslint-disable-next-line functional/immutable-data
          window.location.href = 'https://example.com';
        }
      });
    });

    observer.observe(window.document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  },
});
