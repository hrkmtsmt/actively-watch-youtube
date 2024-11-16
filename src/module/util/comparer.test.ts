import { describe, test, expect } from 'vitest';
import { Comparer } from './comparer';

describe('Comparer class', () => {
  test('Have same compare values when initialize.', () => {
    const comparer = new Comparer('initial value');
    expect(comparer.prev).toBe('initial value');
    expect(comparer.next).toBe('initial value');
    expect(comparer.isEqual()).toBe(true);
  });

  test('Have different comparer values when update.', () => {
    const comparer = new Comparer('initial value');
    comparer.update('next value');
    expect(comparer.prev).toBe('initial value');
    expect(comparer.next).toBe('next value');
    expect(comparer.isEqual()).toBe(false);
  });
});
