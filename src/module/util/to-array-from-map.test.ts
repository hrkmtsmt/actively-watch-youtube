import { describe, test, expect } from 'vitest';
import { toArrayFromMap } from './to-array-from-map';

describe('toArrayFromMap function', () => {
  test('Convert map.', () => {
    const result = toArrayFromMap({ TYPESCRIPT: 'typescript', JAVASCRIPT: 'javascript', GOLANG: 'golang' });
    expect(result).toStrictEqual({
      keys: ['TYPESCRIPT', 'JAVASCRIPT', 'GOLANG'],
      values: ['typescript', 'javascript', 'golang'],
    });
  });
});
