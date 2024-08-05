import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const wrapper = style({
  display: 'flex',
  gap: vars.layouts.pixels[16],
});
