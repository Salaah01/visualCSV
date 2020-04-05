/**Function to return a list of field types for each column of data. */

export const deriveFieldTypes = (data) => {
  /**Iterates each bit of data and crates a list of field types where each
   * element is the field type of the the column in data.
   * The function assumes that all the rows are the same length.
   */

  const fieldTypes = [];
  let fieldTypesOpts;
  let brokenLoop;

  for (let j = 0; j < data[0].length; j++) {
    for (let i = 0; i < data.length; i++) {
      const value = String(data[i][j]);
      brokenLoop = false;
      fieldTypesOpts = new Set(['date', 'number']);
      if (
        // Check for date format.
        value.match(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        )
      ) {
        fieldTypesOpts.delete('number');
      } else if (!isNaN(Number(value))) {
        // Check if number.
        fieldTypesOpts.delete('date');
      } else {
        // If it is NaN and not a date then it must be a string.
        fieldTypes.push('string');
        brokenLoop = true;
        break;
      }

      if (!fieldTypesOpts.size) {
        // If there is no more field types to check against, then the type is
        // string.
        fieldTypes.push('string');
        brokenLoop = true;
        break;
      }
    }

    // If the size of the field types did not become 0, then we can assume that
    // the row is occupied with either all number or dates.
    if (!brokenLoop) {
      if (fieldTypesOpts.has('number')) {
        fieldTypes.push('number');
      } else {
        fieldTypes.push('date');
      }
    }
  }

  return fieldTypes;
};
