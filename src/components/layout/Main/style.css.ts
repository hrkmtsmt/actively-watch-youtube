import { vars } from '@styles/global.css';
import { style } from '@vanilla-extract/css';

export const main = style({
  paddingTop: vars.layouts.pixels[32],
  paddingBottom: vars.layouts.pixels[32],
  paddingLeft: vars.layouts.pixels[16],
  paddingRight: vars.layouts.pixels[16],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.layouts.pixels[32],
  width: 400,
});
