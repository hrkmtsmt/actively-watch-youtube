import { vars } from '@styles/global.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  width: '100%',
  borderRadius: vars.layouts.rounded,
  overflow: 'hidden',
  border: `solid 1px ${vars.colors['dark-gray']}`,
  ':hover': {
    backgroundColor: vars.colors['light-gray'],
    opacity: 0.88,
  },
});

export const image = style({
  aspectRatio: '1/1',
  maxWidth: 120,
  minWidth: 120,
  maxHeight: 120,
  minHeight: 120,
});

export const body = style({
  padding: vars.layouts.pixels[16],
  borderLeft: `solid 1px ${vars.colors['dark-gray']}`,
});

export const title = style({});
