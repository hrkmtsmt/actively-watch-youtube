import React, { useMemo } from 'react';
import { Edit3, Save, X } from 'react-feather';
import { Clipboard, IconButton, Input, Label } from '@components/ui';
import { Horizontal, Vertical } from '@components/layout';
import { useSettingStore } from '@module/storage';

export const Setting: React.FC = () => {
  const { initialize, mode, current, change, start, save, cancel } = useSettingStore();
  const type = useMemo(() => (mode === 'none' ? 'password' : 'text'), [mode]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Vertical>
      <Clipboard label="Origin" value={window.location.origin} />
      <Label label="API Key">
        <Input
          type={type}
          value={current.apiKey}
          disabled={mode === 'none'}
          onChange={(e) => change((state) => ({ ...state, apiKey: e.target.value }))}
        />
      </Label>
      {mode === 'none' ? (
        <Horizontal>
          <IconButton icon={(className) => <Edit3 className={className} onClick={start} />} />
        </Horizontal>
      ) : (
        <Horizontal>
          <IconButton icon={(className) => <Save className={className} onClick={save} />} />
          <IconButton icon={(className) => <X className={className} onClick={cancel} />} />
        </Horizontal>
      )}
    </Vertical>
  );
};
