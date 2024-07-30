import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const tablist = style({
  display: 'flex',
  borderRadius: vars.layouts.rounded,
  border: `solid 1px ${vars.colors['dark-gray']}`,
  overflow: 'hidden',
});

export const tab = style({
  borderLeft: `solid 1px ${vars.colors['dark-gray']}`,
  width: '100%',
});

export const button = style({
  width: '100%',
  textAlign: 'center',
  lineHeight: vars.layouts.pixels[40],
  selectors: {
    '&[aria-selected="true"]': {
      background: vars.colors['light-gray'],
    },
  },
});
