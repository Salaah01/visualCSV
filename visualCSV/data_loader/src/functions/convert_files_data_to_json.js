/**Converts stores files data in the store to a pre-defined json format.
 * The following structure will be created for each file:
 * {
 *   file_id1: {
 *     table_data: [{
 *       col1: {
 *         field_type: string,
 *         contents: [1, 2, 4, 5, 6 7]
 *       }
 *     ]},
 *     primary_key: primary_key_field_name,
 *     foreign_keys: [{
 *      field1: table_name,
 *      field2: table_name
 *     }]
 *   }
 * }
 */

// IMPORTS
// Third Party Imports

// Local Imports
import { PKNameForHeaderElem } from '.';

export const convertFilesDataToJson = (files) => {
  /**Converts the `files` object to predefined JSON format.*/

  const jsonResponse = {};
  if (files) {
    const fileIds = Object.keys(files);

    for (const fileId of fileIds) {
      const file = files[fileId];
      // Level 1.
      jsonResponse[fileId] = {};

      // Level 2
      jsonResponse[fileId].table_data = [];

      // Retrieve the primary key information for the file.
      const primaryKeyElem = PKNameForHeaderElem(fileId);
      let primaryKey;
      if (primaryKeyElem && primaryKeyElem.innerText) {
        primaryKey = JSON.parse(primaryKeyElem.innerText);
      } else {
        primaryKey = '';
      }
      jsonResponse[fileId].primary_key = primaryKey;
      jsonResponse[fileId].foreign_keys = [];

      // Level 3 - table data
      const headerLen = file.header ? file.header.length : 0;
      for (let headIdx = 0; headIdx < headerLen; headIdx++) {
        // Prepare the contents (level 5)
        const contents = [];
        const contentLen = file.content ? file.content.length : 0;
        for (let row = 0; row < contentLen; row++) {
          contents.push(file.content[row][headIdx]);
        }

        jsonResponse[fileId].table_data.push({
          // Level 4 - column
          [file.header[headIdx]]: {
            // Level 5 - field type
            fieldType: file.fieldTypes ? file.fieldTypes[headIdx] : '',
            // Level 5 - contents
            contents: contents,
          },
        });
      }
    }
  }

  return jsonResponse;
};
