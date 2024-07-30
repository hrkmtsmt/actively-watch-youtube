import React from 'react';
import * as styles from './style.css';

export interface MainProps {
  children?: React.ReactNode;
}

const Component: React.FC<MainProps> = (props) => {
  return <main className={styles.main}>{props.children}</main>;
};

export const Main = React.memo(Component);
