/**Unit tests for the import validations. */

import { checkBaseStructure } from '../import_validations';

describe('checkBaseStructure', () => {
  it('should fail if headers is null', () => {
    const validation = checkBaseStructure(null, [1, 2, 3]);
    expect(validation).toEqual(false);
  });

  it('should fail if contents is undefined', () => {
    const validation = checkBaseStructure([1, 2, 3], undefined);
    expect(validation).toEqual(false);
  });

  it('should fail if headers is an empty list.', () => {
    const validation = checkBaseStructure([], [1, 2, 3]);
    expect(validation).toEqual(false);
  });

  it('should fail if content is an empty list.', () => {
    const validation = checkBaseStructure([1, 2, 3], []);
    expect(validation).toEqual(false);
  });

  it('should fail if headers is not an array.', () => {
    const validation = checkBaseStructure('hello world', [1, 2, 3]);
    expect(validation).toEqual(false);
  });

  it('should fail if content is not an array.', () => {
    const validation = checkBaseStructure([1, 2, 3], { a: 1 });
    expect(validation).toEqual(false);
  });

  it('should fail if the row lengths are not the same.', () => {
    const validation = checkBaseStructure([1, 2, 3], [['a', 'b', 'c', 'd']]);
    expect(validation).toEqual(false);
  });

  it('should fail if the row lengths are not the same for some rows.', () => {
    const validation = checkBaseStructure(
      [1, 2, 3],
      [
        ['a', 'b', 'c'],
        ['a', 'b'],
      ],
    );
    expect(validation).toEqual(false);
  });

  it('should pass if both args are array and all the rows are the same length.', () => {
    const validation = checkBaseStructure(
      [1, 2, 3],
      [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
      ],
    );
    expect(validation).toEqual(true);
  });
});
