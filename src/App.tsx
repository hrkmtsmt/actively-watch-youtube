import React, { useMemo } from 'react';
import { Tab, TabPanel, Tabs, useTabs } from '@components/ui';
import { Main } from '@components/layout';
import { Favorite, Setting } from '@components/feature';

export const App: React.FC = () => {
  const tabs: Tab[] = useMemo(
    () => [
      { id: 'favorite', name: 'Favorite' },
      { id: 'setting', name: 'Setting' },
    ],
    []
  );

  const { isSelected, tabIndex, handleClickTab } = useTabs(tabs);

  return (
    <Main>
      <Tabs tabs={tabs} isSelected={isSelected} onClick={handleClickTab} />
      <TabPanel key={tabs[0].id} tabId={tabs[0].id} isSelected={isSelected} tabIndex={tabIndex}>
        <Favorite />
      </TabPanel>
      <TabPanel key={tabs[1].id} tabId={tabs[1].id} isSelected={isSelected} tabIndex={tabIndex}>
        <Setting />
      </TabPanel>
    </Main>
  );
};
