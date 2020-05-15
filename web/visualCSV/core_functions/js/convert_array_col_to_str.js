/**For a single column, converts all entries to a string. */

export const convertArrayColToStr = (data, col) => {
  /**For a single column, converts all entries to a string.
   *
   * Args:
   *  data: (array} A 2x2 array.
   *  col: (int) The column number for where the conversation is to take place.
   */

  const convertedData = [];
  for (let i = 0; i < data.length; i++) {
    convertedData.push([...data[i]]);
    convertedData[i][col] = String(convertedData[i][col]);
  }

  return convertedData;
};
