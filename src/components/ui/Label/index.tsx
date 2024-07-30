import React from 'react';
import * as styles from './style.css';

export interface LabelProps {
  label: string;
  children?: React.ReactNode;
}

const Component: React.FC<LabelProps> = (props) => {
  return (
    <label className={styles.label}>
      <span className={styles.name}>{props.label}</span>
      {props.children}
    </label>
  );
};

export const Label = React.memo(Component);
