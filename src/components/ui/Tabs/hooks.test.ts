import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { Tab, useTabs } from './hooks';

const tabs = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'rust', name: 'Rust' },
  { id: 'go', name: 'Go' },
  { id: 'haskell', name: 'Haskell' },
  { id: 'java', name: 'Java' },
] as const satisfies Tab[];

describe('useTabs React hooks', () => {
  test('initial value is first item in array.', () => {
    const { result } = renderHook(() => useTabs(tabs));
    expect(result.current.isSelected('typescript')).true;
    expect(result.current.tabIndex('typescript')).toEqual(0);
  });

  test('update tabIndex and isSelected when change tab.', () => {
    const { result } = renderHook(() => useTabs(tabs));
    act(() => {
      result.current.handleClickTab('go');
    });
    expect(result.current.isSelected('go')).true;
    expect(result.current.tabIndex('go')).toEqual(0);
  });
});
