/**Unit tests for `hexToRgb`. */

import { hexToRgb } from '../hex_to_rgb';

describe('hexToRgb', () => {
  it('should convert the hex code to the RGB components.', () => {
    const hexCode = '#0033ff';
    const rgbComponents = hexToRgb(hexCode);
    expect(rgbComponents).toEqual({ r: 0, g: 51, b: 255 });
  });
});
