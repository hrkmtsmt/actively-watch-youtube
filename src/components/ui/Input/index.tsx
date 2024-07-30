import React, { ComponentProps } from 'react';
import * as styles from './style.css';

export interface InputProps extends Pick<ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'disabled'> {}

const Component: React.FC<InputProps> = (props) => {
  return <input {...props} className={styles.input} />;
};

export const Input = React.memo(Component);
