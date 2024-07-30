import React from 'react';
import * as styles from './style.css';
import { Tab, UseTabs } from './hooks';

const toName = {
  byTab: (tabId: Tab['id']) => `tab-${tabId}`,
  byPanel: (tabId: Tab['id']) => `panel-${tabId}`,
};

interface TabsProps {
  tabs: Tab[];
  isSelected: UseTabs['isSelected'];
  onClick: UseTabs['handleClickTab'];
}

export const Tabs: React.FC<TabsProps> = (props) => {
  return (
    <ul role="tablist" className={styles.tablist}>
      {props.tabs.map((t) => (
        <li key={t.id} role="tab" className={styles.tab}>
          <button
            type="button"
            className={styles.button}
            id={toName.byTab(t.id)}
            aria-controls={toName.byPanel(t.id)}
            aria-selected={props.isSelected(t.id)}
            onClick={() => props.onClick(t.id)}
          >
            {t.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export interface TabPanelProps {
  tabId: Tab['id'];
  isSelected: UseTabs['isSelected'];
  tabIndex: UseTabs['tabIndex'];
  children?: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
  return (
    <div
      role="tabpanel"
      id={toName.byPanel(props.tabId)}
      aria-labelledby={toName.byTab(props.tabId)}
      tabIndex={props.tabIndex(props.tabId)}
      hidden={!props.isSelected(props.tabId)}
    >
      {props.children}
    </div>
  );
};

export * from './hooks';
