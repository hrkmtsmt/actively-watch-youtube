import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Edit3, Save, X, Plus } from 'react-feather';
import { Card, IconButton, Input, Label, Tab, TabPanel, Tabs, useTabs } from '@components/ui';
import { Horizontal } from '@components/layout/Horizontal';
import { Api, api } from '@module/api';
import { Main, Vertical } from '@components/layout';

const initialState = { current: '', prev: '', disabled: true };

export const App: React.FC = () => {
  const [value, setValue] = useState(initialState);

  const handleSave = useCallback(async () => {
    await chrome.storage.local.set({ apiKey: value.current });

    setValue((state) => ({ current: state.current, prev: state.current, disabled: true }));
  }, [value]);

  const handleEdit = useCallback(() => {
    setValue((state) => ({ ...state, disabled: false }));
  }, []);

  const handleCancel = useCallback(() => {
    setValue((state) => ({ current: state.prev, prev: state.prev, disabled: true }));
  }, []);

  const type = useMemo(() => (value.disabled ? 'password' : 'text'), [value.disabled]);

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
          <Label label="API Key">
            <Input
              type={type}
              value={value.current}
              disabled={value.disabled}
              onChange={(e) => setValue((state) => ({ ...state, current: e.target.value }))}
            />
          </Label>
          {value.disabled ? (
            <Horizontal>
              <IconButton icon={(className) => <Edit3 className={className} onClick={handleEdit} />} />
            </Horizontal>
          ) : (
            <Horizontal>
              <IconButton icon={(className) => <Save className={className} onClick={handleSave} />} />
              <IconButton icon={(className) => <X className={className} onClick={handleCancel} />} />
            </Horizontal>
          )}
        </Vertical>
      </TabPanel>
    </Main>
  );
};
