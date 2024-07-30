import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { colors } from './colors';

const colorProperties = defineProperties({
  conditions: {
    light: {},
    dark: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: 'dark',
  properties: {
    color: colors,
    background: colors,
  },
});

export const sprinkles = createSprinkles(colorProperties);
