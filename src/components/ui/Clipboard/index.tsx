import React from 'react';
import { Copy, Check } from 'react-feather';
import { vars } from '@styles/global.css';
import { Horizontal } from '@components/layout';
import { IconButton, Input, Label, LabelProps } from '@components/ui';
import { UseClipboard } from './hooks';

interface ClipboardProps {
  label: LabelProps['label'];
  value: string;
  isSuccess?: UseClipboard['isSuccess'];
  onClick?: UseClipboard['handleClick'];
}

export const Clipboard: React.FC<ClipboardProps> = (props) => {
  return (
    <Label label={props.label}>
      <Horizontal>
        <Input disabled value={props.value} />
        <IconButton
          icon={(className) =>
            props.isSuccess ? (
              <Check className={className} color={vars.colors.success} />
            ) : (
              <Copy className={className} />
            )
          }
          onClick={() => props.onClick?.(props.value)}
        />
      </Horizontal>
    </Label>
  );
};

export * from './hooks';
