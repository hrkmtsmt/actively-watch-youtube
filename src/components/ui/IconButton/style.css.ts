import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const button = style({
  border: `solid 1px ${vars.colors['dark-gray']}`,
  borderRadius: vars.layouts.rounded,
  maxWidth: vars.layouts.pixels[40],
  minWidth: vars.layouts.pixels[40],
  maxHeight: vars.layouts.pixels[40],
  minHeight: vars.layouts.pixels[40],
  background: vars.colors['light-gray'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const icon = style({
  color: vars.colors.black,
  width: vars.layouts.rems[20],
});
