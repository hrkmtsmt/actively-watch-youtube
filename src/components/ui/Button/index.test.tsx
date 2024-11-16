import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '.';
import '@testing-library/jest-dom/vitest';

describe('Button component', () => {
  test('snapshot', () => {
    render(<Button>Snapshot</Button>);
    expect(document.body.getElementsByTagName('button')[0]).toMatchSnapshot();
  });

  test('render dom with children.', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Hello');
  });
});
