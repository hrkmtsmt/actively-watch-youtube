import { useCallback, useState } from 'react';

export interface Tab {
  id: string;
  name: string;
}

export const useTabs = (tabs: Tab[]) => {
  const [selectedTabId, setSelectedTab] = useState(tabs.at(0)?.id);

  const isSelected = useCallback(
    (tabId: Tab['id']) => {
      return selectedTabId === tabId;
    },
    [selectedTabId]
  );

  const tabIndex = useCallback(
    (tabId: Tab['id']) => {
      return isSelected(tabId) ? 0 : -1;
    },
    [isSelected]
  );

  const handleClickTab = useCallback((tabId: Tab['id']) => {
    setSelectedTab(tabId);
  }, []);

  return { isSelected, tabIndex, handleClickTab };
};

export type UseTabs = ReturnType<typeof useTabs>;
