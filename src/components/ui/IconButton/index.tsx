import React, { ComponentProps } from 'react';
import * as styles from './style.css';

export interface IconButtonProps extends Pick<ComponentProps<'button'>, 'onClick' | 'disabled'> {
  icon?: (className: string) => React.ReactNode;
}

const Component: React.FC<IconButtonProps> = (props) => {
  return (
    <button type="button" className={styles.button} disabled={props.disabled} onClick={props.onClick}>
      {props.icon?.(styles.icon)}
    </button>
  );
};

export const IconButton = React.memo(Component);
