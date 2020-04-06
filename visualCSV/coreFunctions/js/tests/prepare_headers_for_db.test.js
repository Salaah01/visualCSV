/**Unit test for PrepareHeadersForDB */
import { PrepareHeadersForDB } from '../prepare_headers_for_db';

describe('convert to strings', () => {
  it('should convert each element to a string.', () => {
    const data = ['a', 1, 2, 3];
    const actual = new PrepareHeadersForDB(data).convert_to_strings();
    expect(actual).toEqual(['a', '1', '2', '3']);
  });
});

describe('replace_spaces_with_underscores', () => {
  it('should replace all spaces with underscores.', () => {
    const data = ['  a  ', ' b b '];
    const actual = new PrepareHeadersForDB(
      data,
    ).replace_spaces_with_underscores();
    expect(actual).toEqual(['__a__', '_b_b_']);
  });
});

describe('fill_empty_elements', () => {
  it('should fill any empty elements.', () => {
    const data = ['', 'a', ''];
    const actual = new PrepareHeadersForDB(data).fill_empty_elements();
    expect(actual).toEqual(['header_1', 'a', 'header_3']);
  });
});

describe('handle_duplicates', () => {
  it('should add an integer at the end of duplicate headers.', () => {
    const data = ['a', 'a', 'a'];
    const actual = new PrepareHeadersForDB(data).handle_duplicates();
    expect(actual).toEqual(['a', 'a_1', 'a_2']);
  });
});
