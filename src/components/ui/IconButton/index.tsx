import React, { ComponentProps } from 'react';
import * as styles from './style.css';

export interface IconButtonProps extends Pick<ComponentProps<'button'>, 'onClick'> {
  icon?: (className: string) => React.ReactNode;
}

const Component: React.FC<IconButtonProps> = (props) => {
  return (
    <button {...props} type="button" className={styles.button}>
      {props.icon?.(styles.icon)}
    </button>
  );
};

export const IconButton = React.memo(Component);
