import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const button = style({
  width: vars.layouts.pixels[32],
  height: vars.layouts.pixels[32],
  background: vars.colors['light-gray'],
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
});

export const icon = style({
  color: vars.colors.black,
});
