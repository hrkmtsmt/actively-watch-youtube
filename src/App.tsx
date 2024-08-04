import React, { useMemo } from 'react';
import { TabPanel, Tabs, useTabs } from '@components/ui';
import { Main } from '@components/layout';
import { Favorite, Setting } from '@components/feature';
import { toArrayFromMap } from '@module/util';
import { TABS } from '@module/constant';

export const App: React.FC = () => {
  const tabs = useMemo(() => toArrayFromMap(TABS), []);
  const { isSelected, tabIndex, handleClickTab } = useTabs(tabs.values);

  return (
    <Main>
      <Tabs tabs={tabs.values} isSelected={isSelected} onClick={handleClickTab} />
      <TabPanel tabId={TABS.favorite.id} isSelected={isSelected} tabIndex={tabIndex}>
        <Favorite />
      </TabPanel>
      <TabPanel tabId={TABS.setting.id} isSelected={isSelected} tabIndex={tabIndex}>
        <Setting />
      </TabPanel>
    </Main>
  );
};
