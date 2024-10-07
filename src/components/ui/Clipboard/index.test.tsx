import React from 'react';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Clipboard } from '.';

describe('Clipboard component', () => {
  test('snapshot copy icon', () => {
    render(<Clipboard label="Share" value="https://example.com" />);
    expect(document.body.getElementsByTagName('label')[0]).toMatchSnapshot();
  });

  test('snapshot success icon', () => {
    render(<Clipboard label="Share" value="https://example.com" isSuccess />);
    expect(document.body.getElementsByTagName('label')[0]).toMatchSnapshot();
  });
});
