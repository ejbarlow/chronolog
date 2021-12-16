/**
 * Convert an array of rgb values to HSL.
 *
 * @param [number, number, number] Red, green and blue values.
 * @return Array<number> Hue, saturation and lightness values.
 */
export const rgbaToHSL = ([r, g, b]: number[]) => {
  (r /= 255), (g /= 255), (b /= 255);

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h = 0,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }
  return [h * 255, s * 100, l * 100];
};

/**
 * Convert an array of HSL values to a string to be used as a CSS value.
 *
 * @param h Hue value input.
 * @param s Saturation value input.
 * @param l Lightness value input.
 * @return string A string containing an HSL color to be used as a CSS value.
 */
export const hsl = (h: number, s: number, l: number) => {
  return `hsl(${h}, ${s}%, ${l}%)`;
};
