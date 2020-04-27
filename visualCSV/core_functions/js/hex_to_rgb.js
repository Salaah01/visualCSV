/**Converts a hex colour to rgb components. E.g: '#0033ff' =>
 * `{r: 0, g: 51, b: 255}`
 */

export const hexToRgb = (hex) => {
  /**Converts a hex colour to rgb components.
   * Args:
   *  hex: (str) A hex colour code.
   */
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
