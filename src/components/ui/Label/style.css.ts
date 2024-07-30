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
