import { describe, test, expect } from 'vitest';
import { toQueryString } from './to-query-string';

describe('toQueryString function', () => {
  test('Convert query string from string parameter.', () => {
    const result = toQueryString({ s: 'typescript' });
    expect(result).toBe('s=typescript');
  });

  test('Convert query string from string array parameter.', () => {
    const result = toQueryString({ type: ['string', 'number', 'boolean'] });
    expect(result).toBe('type%5B%5D=string%2Cnumber%2Cboolean');
  });

  test('Convert query string from some parameters.', () => {
    const result = toQueryString({ lang: 'ja', food: ['sushi', 'tempura'] });
    expect(result).toBe('lang=ja&food%5B%5D=sushi%2Ctempura');
  });
});
