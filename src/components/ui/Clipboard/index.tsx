import React from 'react';
import { Copy, Check } from 'react-feather';
import { Horizontal } from '@components/layout';
import { IconButton, Input, Label, LabelProps } from '@components/ui';
import { useClipboard } from './hooks';
import { vars } from '@styles/global.css';

interface ClipboardProps {
  label: LabelProps['label'];
  value: string;
}

export const Clipboard: React.FC<ClipboardProps> = (props) => {
  const { isSuccess, handleClick } = useClipboard();

  return (
    <Label label={props.label}>
      <Horizontal>
        <Input disabled value={props.value} />
        <IconButton
          icon={(className) =>
            isSuccess ? <Check className={className} color={vars.colors.success} /> : <Copy className={className} />
          }
          onClick={() => handleClick(props.value)}
        />
      </Horizontal>
    </Label>
  );
};
