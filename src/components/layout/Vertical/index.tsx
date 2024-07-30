import React from 'react';
import * as styles from './style.css';

export interface VerticalProps {
  children?: React.ReactNode;
}

export const Vertical: React.FC<VerticalProps> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
