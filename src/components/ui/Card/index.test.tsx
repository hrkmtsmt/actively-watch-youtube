import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '.';
import '@testing-library/jest-dom/vitest';

describe('Button component', () => {
  test('snapshot', () => {
    render(
      <Card
        title="The Pragmatic Programmer"
        url="https://example.com"
        image={{ url: 'https://example.com/image', width: 256, height: 256 }}
      />
    );
    expect(document.body.getElementsByTagName('a')[0]).toMatchSnapshot();
  });

  test('render dom with children.', () => {
    render(
      <Card
        title="Test Driven Development"
        url="https://example.com"
        image={{ url: 'https://example.com/image', width: 256, height: 256 }}
      />
    );
    expect(screen.getByRole('link')).toHaveTextContent('Test Driven Development');
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Driven Development');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image');
  });
});
