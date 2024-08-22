import { useCallback, useState } from 'react';

export interface Tab {
  id: string;
  name: string;
}

export const useTabs = <T extends Tab[]>(tabs: T) => {
  const [selectedTabId, setSelectedTab] = useState(tabs.at(0)?.id);

  const isSelected = useCallback(
    <P extends T[number]['id']>(tabId: P) => {
      return selectedTabId === tabId;
    },
    [selectedTabId]
  );

  const tabIndex = useCallback(
    <P extends T[number]['id']>(tabId: P) => {
      return isSelected(tabId) ? 0 : -1;
    },
    [isSelected]
  );

  const handleClickTab = useCallback(<P extends T[number]['id']>(tabId: P) => {
    setSelectedTab(tabId);
  }, []);

  return { isSelected, tabIndex, handleClickTab };
};

export type UseTabs = ReturnType<typeof useTabs>;
