import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const button = style({
  background: vars.colors['light-gray'],
  height: vars.layouts.pixels[32],
  paddingRight: vars.layouts.pixels[8],
  paddingLeft: vars.layouts.pixels[8],
});
