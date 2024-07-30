import React from 'react';
import * as styles from './style.css';

export interface HorizontalProps {
  children?: React.ReactNode;
}

export const Horizontal: React.FC<HorizontalProps> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
