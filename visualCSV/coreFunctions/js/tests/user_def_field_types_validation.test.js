/**Unit test for the user_def_field_types_validation module. */

import { userDefFieldTypesValidation } from '../user_def_field_types_validation';

describe('userDefFieldTypesValidation', () => {
  it('should accept all cases where the fieldType is string.', () => {
    const data = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    const result = userDefFieldTypesValidation(data, 'string', 0);
    expect(result).toEqual(true);
  });

  it('should return false where a field cannot be a number.', () => {
    const data = [
      ['a', 1, 3],
      [4, 5, 6],
    ];
    const result = userDefFieldTypesValidation(data, 'number', 0);
    expect(result).toEqual(false);
  });

  it('should return false where a field cannot be a date.', () => {
    const data = [
      ['18/15/2020', 1, 3],
      ['01/12/2012', 5, 6],
    ];
    const result = userDefFieldTypesValidation(data, 'date', 0);
    expect(result).toEqual(false);
  });

  it('should return true where all fields in a column can be a date.', () => {
    const data = [
      ['18/05/2020', 1, 3],
      ['01/12/2012', 5, 6],
    ];
    const result = userDefFieldTypesValidation(data, 'date', 0);
    expect(result).toEqual(true);
  });

  it('should return true where all fields in a column can be a number.', () => {
    const data = [
      ['1', 1, 3],
      [5, 5, 6],
    ];
    const result = userDefFieldTypesValidation(data, 'date', 0);
    expect(result).toEqual(false);
  });
});
