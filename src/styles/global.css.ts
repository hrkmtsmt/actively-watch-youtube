import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import { colors } from './colors';
import { layouts } from './layouts';
// import { sprinkles } from './sprinkles.css';

export const vars = createGlobalTheme(':root', {
  colors,
  layouts,
});

// const body = sprinkles({
//   color: {
//     light: 'black',
//     dark: 'white',
//   },
//   background: {
//     light: 'white',
//     dark: 'black',
//   },
// });

globalStyle('', {});

globalStyle('*, *:before, *:after', {
  transition: 'ease-in-out 0.2s',
  fontSize: vars.layouts.rems[16],
  lineHeight: vars.layouts.rems[24],
});
