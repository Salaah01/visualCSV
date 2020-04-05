/**Redux actions related to the files being uploaded. These include:
 *  newFileUploadStart: Starts the upload process for a file. This process
 *    involves storing the file ID and file name.
 *  newFileUploadSuccess: Action to indicate that a file has been parsed
 *    successfully as well as store the data.
 *  newFileUploadFail: Action to indicate that a file could not be uploaded.
 *  splitParsedData: Action to split data into the header and the body content.
 */

import * as actionTypes from './actionTypes';

export const newFileUploadStart = (id, fileName) => {
  /**Starts the upload process for a file. This process involves storing the
   * file ID and file name.
   */
  return {
    type: actionTypes.NEW_FILE_UPLOAD_START,
    id: id,
    fileName: fileName,
  };
};

export const newFileUploadSuccess = (id, data) => {
  /** Action to indicate that a file has been parsed successfully as well as
   * store the data.
   */
  return {
    type: actionTypes.NEW_FILE_UPLOAD_SUCCESS,
    id: id,
    data: data,
  };
};

export const newFileUploadFail = (id) => {
  /**Action to indicate that a file could not be uploaded. */
  return {
    type: actionTypes.NEW_FILE_UPLOAD_FAIL,
    id: id,
  };
};

export const splitParsedData = (id) => {
  /**Action to split data into the header and the body content. */
  return {
    type: actionTypes.SPLIT_PARSED_DATA,
    id: id,
  };
};
