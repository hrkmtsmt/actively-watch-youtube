import { style } from '@vanilla-extract/css';
import { vars } from '@styles/global.css';

export const input = style({
  border: `solid 1px ${vars.colors['dark-gray']}`,
  borderRadius: vars.layouts.rounded,
  lineHeight: vars.layouts.rems[32],
  paddingRight: vars.layouts.rems[8],
  paddingLeft: vars.layouts.rems[8],
});
