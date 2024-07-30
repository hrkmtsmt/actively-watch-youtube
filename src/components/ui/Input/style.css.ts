import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const label = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.layouts.pixels[8],
});

export const name = style({
  fontWeight: 700,
  fontSize: vars.layouts.rems[12],
});

export const input = style({
  border: `solid 1px ${vars.colors['dark-gray']}`,
  borderRadius: vars.layouts.rounded,
  lineHeight: vars.layouts.rems[40],
  paddingRight: vars.layouts.rems[8],
  paddingLeft: vars.layouts.rems[8],
  ':disabled': {
    background: vars.colors['light-gray'],
  },
});
