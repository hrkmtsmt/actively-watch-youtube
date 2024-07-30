import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const button = style({
  border: `solid 1px ${vars.colors['dark-gray']}`,
  borderRadius: vars.layouts.rounded,
  width: vars.layouts.pixels[40],
  height: vars.layouts.pixels[40],
  background: vars.colors['light-gray'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const icon = style({
  color: vars.colors.black,
  width: vars.layouts.rems[20],
});
