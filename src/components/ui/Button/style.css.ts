import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const button = style({
  borderRadius: vars.layouts.rounded,
  background: vars.colors['light-gray'],
  border: `solid 1px ${vars.colors['dark-gray']}`,
  height: vars.layouts.pixels[40],
  paddingRight: vars.layouts.pixels[8],
  paddingLeft: vars.layouts.pixels[8],
  ':active': {
    transform: 'scale(0.96)',
  },
});
