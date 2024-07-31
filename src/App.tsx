import React, { useState, useMemo, useEffect } from 'react';
import { Edit3, Save, X, Plus } from 'react-feather';
import { Card, Clipboard, IconButton, Input, Label, Tab, TabPanel, Tabs, useTabs } from '@components/ui';
import { Horizontal } from '@components/layout/Horizontal';
import { Main, Vertical } from '@components/layout';
import { Api, api } from '@module/api';
import { useSettingStore } from '@module/storage';

export const App: React.FC = () => {
  const { mode, current, change, start, save, cancel } = useSettingStore();

  const type = useMemo(() => (mode === 'none' ? 'password' : 'text'), [mode]);

  const tabs: Tab[] = useMemo(
    () => [
      { id: 'favorite', name: 'Favorite' },
      { id: 'setting', name: 'Setting' },
    ],
    []
  );

  const { isSelected, tabIndex, handleClickTab } = useTabs(tabs);

  const [channelIds] = useState<string[]>([]);

  const [channels, setChannels] = useState<Api.YouTube.Channels.GetResponse['items']>([]);

  useEffect(() => {
    api.youtube.channels
      .list({ channelIds })
      .then((response) => setChannels(response.items.toSorted((a, b) => a.id.localeCompare(b.id))));
  }, [channelIds]);

  return (
    <Main>
      <Tabs tabs={tabs} isSelected={isSelected} onClick={handleClickTab} />
      <TabPanel key={tabs[0].id} tabId={tabs[0].id} isSelected={isSelected} tabIndex={tabIndex}>
        <Vertical>
          {channels.map((data) => (
            <Card
              key={data.id}
              url={`https://www.youtube.com/${data.snippet.customUrl}`}
              image={data.snippet.thumbnails.medium}
              title={data.snippet.title}
            />
          ))}
          <IconButton
            icon={(className) => (
              <Plus
                className={className}
                onClick={() => {
                  //
                }}
              />
            )}
          />
        </Vertical>
      </TabPanel>
      <TabPanel key={tabs[1].id} tabId={tabs[1].id} isSelected={isSelected} tabIndex={tabIndex}>
        <Vertical>
          <Clipboard label="Origin" value={window.location.origin} />
          <Label label="API Key">
            <Input
              type={type}
              value={current.apiKey}
              disabled={mode === 'none'}
              onChange={(e) => change((state) => ({ ...state, apiKey: e.target.value }))}
            />
          </Label>
          {mode === 'none' ? (
            <Horizontal>
              <IconButton icon={(className) => <Edit3 className={className} onClick={start} />} />
            </Horizontal>
          ) : (
            <Horizontal>
              <IconButton icon={(className) => <Save className={className} onClick={save} />} />
              <IconButton icon={(className) => <X className={className} onClick={cancel} />} />
            </Horizontal>
          )}
        </Vertical>
      </TabPanel>
    </Main>
  );
};
