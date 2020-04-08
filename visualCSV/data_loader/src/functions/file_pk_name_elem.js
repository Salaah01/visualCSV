/**When a file is uploaded successfully, the user will be presented with radio
 * buttons where each radio button is a header in the CSV they had uploaded.
 * On click these radio buttons, a HTML element's inner text will be updated to
 * {"<fileID>": "<header>"}.
 *
 * This function will be able to retrieve that field.
 */

// IMPORTS
// Third Party Imports

// Local Imports
import { HEADER_PK_ELEM_ID_PREFIX } from '../constants';

export const PKNameForHeaderElem = (fileId) =>
  /**Retrieve HTML element which contains the stringified JSON of a file and the
   * primary key (header) for that file.
   * Args:
   *  fileId: (str|number) Identifies a file.
   */
  document.getElementById(`${HEADER_PK_ELEM_ID_PREFIX}${fileId}`);
