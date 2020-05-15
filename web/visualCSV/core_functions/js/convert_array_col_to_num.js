/**For a single column, converts all entries to a number. */

export const convertArrayColToNum = (data, col) => {
  /**For a single column, converts all entries to a number.
   *
   * Args:
   *  data: (array} A 2x2 array.
   *  col: (int) The column number for where the conversation is to take place.
   */

  const convertedData = [];
  for (let i = 0; i < data.length; i++) {
    convertedData.push([...data[i]]);
    convertedData[i][col] = Number(convertedData[i][col]);
  }

  return convertedData;
};
