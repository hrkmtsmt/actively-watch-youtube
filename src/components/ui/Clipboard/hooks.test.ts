import { describe, test, expect, beforeAll, vi, afterAll } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useClipboard } from './hooks';

class ClipboardFaker {
  private value = '';

  public async writeText(value: string) {
    this.value = value;
  }

  public async readText() {
    return this.value;
  }
}

beforeAll(() => {
  vi.useFakeTimers();
  vi.stubGlobal('navigator', { clipboard: new ClipboardFaker() });
});

afterAll(() => {
  vi.useRealTimers();
});

describe('useClipboard React hooks', () => {
  test('Copy value.', async () => {
    const { result } = renderHook(useClipboard);
    await act(async () => {
      await result.current.handleClick('Copy value.');
    });
    expect(await window.navigator.clipboard.readText()).toBe('Copy value.');
  });

  test('Check success state.', async () => {
    const { result } = renderHook(useClipboard);
    await act(async () => {
      await result.current.handleClick('');
    });
    expect(result.current.isSuccess).true;
    await vi.runOnlyPendingTimersAsync();
    expect(result.current.isSuccess).false;
  });
});
