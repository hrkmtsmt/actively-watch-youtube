import React, { ComponentProps } from 'react';
import * as styles from './style.css';

export interface ButtonProps extends Pick<ComponentProps<'button'>, 'onClick' | 'children'> {}

const Component: React.FC<ButtonProps> = (props) => {
  return <button {...props} type="button" className={styles.button} />;
};

export const Button = React.memo(Component);
