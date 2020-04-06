/**Using an array of headers, the class will return a new array which can
 * be used as table names on a database.
 */

export class PrepareHeadersForDB {
  /**Using an array of headers, the class will be able to run through series of
   * manipulations which will ultimately produce a new set of headers which
   * can be used as table names on database.
   */

  constructor(headers) {
    /**Constructor */
    this.headers = [...headers];
  }

  run_all_conversions = () => {
    /**Runs all conversations set in the methods over a copy of `this.headers`
     */
    let headers = [...this.headers];
    headers = this.convert_to_strings(headers);
    headers = this.replace_spaces_with_underscores(headers);
    headers = this.fill_empty_elements(headers);
    headers = this.handle_duplicates(headers);

    return headers;
  };

  _copy_headers_or_get_args = (headers) => {
    /**A helper method which will either return a copy of `headers` or a copy
     * of `this.headers`.
     */
    return headers ? [...headers] : [...this.headers];
  };

  convert_to_strings = (headersArr = null) => {
    /**Converts each element in the array to a string. */
    const headers = this._copy_headers_or_get_args(headersArr);
    return headers.map((header) => String(header));
  };

  replace_spaces_with_underscores = (headersArr = null) => {
    /**Replaces each space in each header with a underscore. */
    const headers = this._copy_headers_or_get_args(headersArr);
    return headers.map((header) => header.replace(/ /g, '_'));
  };

  fill_empty_elements = (headersArr = null) => {
    /**If any of the headers are an empty string, replace it with
     * header_{i+1}
     */
    const headers = this._copy_headers_or_get_args(headersArr);
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] === '') {
        headers[i] = `header_${i + 1}`;
      }
    }
    return headers;
  };

  handle_duplicates = (headersArr = null) => {
    /**Append an integer at the end of any duplicate headers. */
    const headers = this._copy_headers_or_get_args(headersArr);
    const headersSet = new Set();

    for (let i = 0; i < headers.length; i++) {
      if (headersSet.has(headers[i])) {
        let suffixInt = 1;
        let targetHeader;
        while (suffixInt) {
          targetHeader = `${headers[i]}_${suffixInt}`;
          if (headersSet.has(targetHeader)) {
            suffixInt += 1;
          } else {
            headers[i] = targetHeader;
            headersSet.add(headers[i]);
            break;
          }
        }
      } else {
        headersSet.add(headers[i]);
      }
    }
    return headers;
  };
}
