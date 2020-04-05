/**Unit test for the derive_field_types module. */

import { deriveFieldTypes } from './derive_field_types';

describe('deriveFieldTypes', () => {
  const expectedResults = ['string', 'number', 'date'];
  const data = [
    [1234, 1234, '01/12/2013'],
    ['01/12/2012', 338412, '05/01/2017'],
    ['Hello World', 4823, '05/02/2020'],
  ];
  const actualResults = deriveFieldTypes(data);

  it('first column should be string', () => {
    expect(actualResults[0]).toEqual(expectedResults[0]);
  });

  it('second column should be number', () => {
    expect(actualResults[1]).toEqual(expectedResults[1]);
  });

  it('third column should be date', () => {
    expect(actualResults[2]).toEqual(expectedResults[2]);
  });
});
