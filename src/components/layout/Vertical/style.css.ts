import { vars } from '@styles/global.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.layouts.pixels[16],
});
