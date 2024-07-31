import React from 'react';
import { Copy } from 'react-feather';
import { Horizontal } from '@components/layout';
import { IconButton, Input, Label, LabelProps } from '@components/ui';

interface ClipboardProps {
  label: LabelProps['label'];
  value: string;
}

export const Clipboard: React.FC<ClipboardProps> = (props) => {
  return (
    <Label label={props.label}>
      <Horizontal>
        <Input disabled value={props.value} />
        <IconButton
          icon={(className) => <Copy className={className} />}
          onClick={() => window.navigator.clipboard.writeText(props.value)}
        />
      </Horizontal>
    </Label>
  );
};
