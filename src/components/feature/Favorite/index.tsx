import React, { useState, useEffect } from 'react';
import { Horizontal, Vertical } from '@components/layout';
import { Card, IconButton, Input } from '@components/ui';
import { Check, Plus, X } from 'react-feather';
import { useChannelsStore } from '@module/storage';
import { api } from '@module/api';

export const Favorite: React.FC = () => {
  const { initialize, add, channels } = useChannelsStore();
  const [isShowAddField, setIsShowAddField] = useState<boolean>(false);
  const [channel, setChannel] = useState<string>('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Vertical>
      {channels.map((data) => (
        <Card
          key={data.id}
          url={`https://www.youtube.com/${data.snippet.customUrl}`}
          image={data.snippet.thumbnails.medium}
          title={data.snippet.title}
        />
      ))}
      {!!isShowAddField && (
        <Horizontal>
          <Input value={channel} onChange={(e) => setChannel(e.target.value)} />
          <IconButton
            icon={(className) => (
              <Check
                className={className}
                onClick={() => {
                  setIsShowAddField(false);
                  setChannel((channelId) => {
                    api.youtube.channels
                      .list({ channelIds: [channelId] })
                      .then((response) => {
                        add(channelId, response.items[0]);
                      })
                      .catch(console.error);
                    return '';
                  });
                }}
              />
            )}
          />
          <IconButton
            icon={(className) => (
              <X
                className={className}
                onClick={() => {
                  setIsShowAddField(false);
                  setChannel('');
                }}
              />
            )}
          />
        </Horizontal>
      )}
      <IconButton
        disabled={isShowAddField}
        icon={(className) => (
          <Plus
            className={className}
            onClick={() => {
              setIsShowAddField(true);
            }}
          />
        )}
      />
    </Vertical>
  );
};
