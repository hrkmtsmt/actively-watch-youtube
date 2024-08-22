import { useState, useCallback } from 'react';

export const useClipboard = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = useCallback(async (value: string) => {
    await window.navigator.clipboard.writeText(value);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  }, []);

  return { isSuccess, handleClick };
};

export type UseClipboard = ReturnType<typeof useClipboard>;
