/**Functions to validate the file imports. */

export const checkBaseStructure = (headers, content) => {
  /**Checks to ensure that the base structure of the imported file is valid.
   * These do not check the field type but with check that there is headers
   * and content and each row of data is the same length.
   */
  let valid = true;

  // Checks if either of the two variables are falsy.
  if (!headers || !content) {
    return false;
  }

  // Check for empty lists.
  if (!headers.length || !content.length) {
    return false;
  }

  // Check that they are Arrays.
  if (!Array.isArray(headers) || !Array.isArray(content)) {
    return false;
  }

  // Check the length of each row is the same.
  const rowLength = headers.length;
  for (const dataRow of content) {
    if (dataRow.length !== rowLength) {
      return false;
    }
  }

  return true;
};
