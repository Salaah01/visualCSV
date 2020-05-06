/**Function to return true/false to indicate if a  `fieldType` can be used for
 * some `data` in a single column.
 */

export const userDefFieldTypesValidation = (data, fieldType, col) => {
  /**Traverses the `data` through a column and checks if the `fieldType` can
   * be applied.
   *
   * Args:
   *  data: (array} A 2x2 array for to test the `fieldType` on.
   *  fieldType: (string) Field type to use when checking through data.
   *  col: (int) The column number in which the check the field type in.
   */

  // All types can be converted to a string, so if `fieldType === 'string'`
  // return true.
  if (fieldType === 'string') {
    return true;
  }

  const applicableFieldType = (value) => {
    if (fieldType === 'number') {
      return !isNaN(Number(value));
    } else if (fieldType === 'date') {
      return (
        value.match(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        ) !== null
      );
    } else {
      throw Error(
        "invalid fieldType, valid fieldTypes are 'string', 'number' and 'date'",
      );
    }
  };

  for (let i = 0; i < data.length; i++) {
    if (!applicableFieldType(data[i][col])) {
      return false;
    }
  }

  return true;
};
