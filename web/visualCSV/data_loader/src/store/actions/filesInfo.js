/**Redux actions related to the files being uploaded. These include:
 *  newFileUploadStart: Starts the upload process for a file. This process
 *    involves storing the file ID and file name.
 *  newFileUploadSuccess: Action to indicate that a file has been parsed
 *    successfully as well as store the data.
 *  newFileUploadFail: Action to indicate that a file could not be uploaded.
 *  splitParsedData: Action to split data into the header and the body content.
 *  setFieldTypes: Action to set an array of field types for each column of
 *    data where data is a 2x2 array for a given file.
 *  validateBaseStructure: Validates the base structure of the imported file.
 *  updateUserDefFieldType: Action to indicate that the user has changed a
 *    field type and to add the store with the user defined fields.
 *  filesReadyToImport: Action to indicate that files are ready to upload.
 *  filesNotReadyToImport: Action to indicate that files are not ready to
 *    upload.
 *  setPrimaryKey: Action to set a the primary key for a file.
 *  setForeignKey: Action to set a foreign key for a header of a file.
 *  removeForeignKey: Action to remove a foreign key from a header of a file.
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

export const setFieldTypes = (id) => {
  /**Action to set an array of field types for each column of data where data
   * is a 2x2 array for a given file.
   */
  return {
    type: actionTypes.SET_FIELD_TYPES,
    id: id,
  };
};

export const updateUserDefFieldType = (id, fieldTypes) => {
  /**Action to indicate that the user has changed a field type and to add the
   * user defined fields to the store.
   */
  return {
    type: actionTypes.UPDATE_USER_DEF_FIELD_TYPES,
    id: id,
    fieldTypes: fieldTypes,
  };
};

export const filesReadyToUpload = () => {
  /**Action to indicate that files are ready to upload. */
  return {
    type: actionTypes.FILES_READY_TO_UPLOAD,
  };
};

export const filesNotReadyToUpload = () => {
  /**Action to indicate that files are not ready to upload. */
  return {
    type: actionTypes.FILES_NOT_READY_TO_UPLOAD,
  };
};

export const setPrimaryKey = (id, pk) => {
  /**Action to set a primary key for a file. */
  return {
    type: actionTypes.SET_PRIMARY_KEY,
    id: id,
    pk: pk,
  };
};

export const setForeignKey = (id, header, fk) => {
  /**Action to set a foreign key for a header of a file. */
  return {
    type: actionTypes.SET_FOREIGN_KEY,
    id: id,
    header: header,
    fk: fk
  };
};

export const removeForeignKey = (id, header) => {
  /**Action to remove a foreign key for a header of a file. */
  return {
    type: actionTypes.REMOVE_FOREIGN_KEY,
    id: id,
    header: header,
  };
};
