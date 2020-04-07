/**Unit tests for the convert_array_col_to_num module. */

import { convertArrayColToNum } from '../convert_array_col_to_num';

describe('convertArrayColToNum', () => {
  it('should convert the first row string to numbers.', () => {
    const data = [
      ['1', 'a', 'b'],
      ['2', 'c', 'd'],
      [3, 'e', 'f'],
    ];
    const convertedData = convertArrayColToNum(data, 0);
    expect(convertedData).toEqual([
      [1, 'a', 'b'],
      [2, 'c', 'd'],
      [3, 'e', 'f'],
    ]);
  });
});
