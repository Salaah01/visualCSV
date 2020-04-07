/**Contains the redux reducers related to the files being uploaded. These
 * include:
 *  newFileUploadStart: Starts the upload process for a file. This process
 *    involves storing the file ID and file name.
 *  newFileUploadSuccess: Sets the status to indicate that the file could be
 *    read and stores the data.
 *  newFileUploadFail: Indicates that the file could not be read.
 *  splitParsedData: Splits the data to two objects, one containing the header
 *    and another containing the body content.
 *  setFieldTypes: Set an array of field types for each column of data where
 *    data is a 2x2 array for a given file.
 *  updateUserDefFieldType: Indicates that the user has changed he the field
 *    types and store the user defined field types.
 *  filesReadyToUpload: Update the store to indicate that files are ready to
 *    be uploaded.
 *  filesNotReadyToUpload: Update the store to indicate that files are not
 *    ready to be uploaded.
 */

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../core_functions/js/updateObject';
import {
  deriveFieldTypes,
  checkBaseStructure,
  PrepareHeadersForDB,
} from '../../../../core_functions/js';
const initialState = {
  files: {},
  filesReadyToUpload: false,
};

export const fileStates = {
  PARSING_CSV_IN_PROGRESS: 'PARSING_CSV_IN_PROGRESS',
  PARSING_CSV_SUCCESS: 'PARSING_CSV_SUCCESS',
  PARSING_CSV_FAIL: 'PARSING_CSV_FAIL',
};

const newFileUploadStart = (state, action) => {
  /**Starts the upload process for a file. This process  involves storing the
   * file ID and file name.
   */
  const updatedFiles = updateObject(state.files, {
    [action.id]: {
      name: action.fileName,
      status: fileStates.PARSING_CSV_IN_PROGRESS,
    },
  });

  return updateObject(state, { files: updatedFiles });
};

const newFileUploadSuccess = (state, action) => {
  /**Sets the status to indicate that the file could be read and stores the
   * data.
   */
  const updatedFile = {
    ...state.files[action.id],
    status: fileStates.PARSING_CSV_SUCCESS,
    data: action.data,
  };
  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });

  return updateObject(state, { files: updatedFiles });
};

const newFileUploadFail = (state, action) => {
  /**Indicates that the file could not be read. */
  const updatedFile = {
    ...state.files[action.id],
    status: fileStates.PARSING_CSV_FAIL,
  };
  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });

  return updateObject(state, { files: updatedFiles });
};

const splitParsedData = (state, action) => {
  /**Splits the data to two objects, one containing the header and another
   * containing the body content. If they not exist, the write back `null` for
   * both variables and set the status to indicate that parsing had failed.
   */

  let headers;
  let content;
  let status;

  try {
    headers = state.files[action.id].data[0];
    content = state.files[action.id].data.slice(1);
    status = fileStates.PARSING_CSV_SUCCESS;

    if (checkBaseStructure(headers, content)) {
      headers = new PrepareHeadersForDB(headers).run_all_conversions();
    } else {
      headers = null;
      content = null;
      status = fileStates.PARSING_CSV_FAIL;
    }
  } catch {
    headers = null;
    content = null;
    status = fileStates.PARSING_CSV_FAIL;
  }

  const updatedFile = {
    ...state.files[action.id],
    header: headers,
    content: content,
    status: status,
  };

  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });
  return updateObject(state, { files: updatedFiles });
};

const setFieldTypes = (state, action) => {
  /** Set an array of field types for each column of data where data is a 2x2
   *  array for a given file.
   */
  const file = state.files[action.id];
  if (file.status === fileStates.PARSING_CSV_FAIL) {
    return state;
  } else {
    const fieldTypes = deriveFieldTypes(file.content);
    const updatedFile = {
      ...file,
      fieldTypes: fieldTypes,
      userChangedFields: false,
    };

    const updatedFiles = updateObject(state.files, {
      [action.id]: updatedFile,
    });

    return updateObject(state, { files: updatedFiles });
  }
};

const updateUserDefFieldType = (state, action) => {
  /**Indicates that the user has changed he the field types and store the user
   * defined field types.
   */
  const file = state.files[action.id];
  const updatedFile = {
    ...file,
    userChangedFields: true,
    userDefFieldTypes: action.fieldTypes,
  };

  const updatedFiles = updateObject(state.files, {
    [action.id]: updatedFile,
  });

  return updateObject(state, { files: updatedFiles });
};

const filesReadyToUpload = (state) => {
  /**Update the store to indicate that files are ready to be uploaded. */
  return updateObject(state, { filesReadyToUpload: true });
};

const filesNotReadyToUpload = (state) => {
  /**Update the store to indicate that files are not ready to be uploaded. */
  return updateObject(state, { filesReadyToUpload: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_FILE_UPLOAD_START:
      return newFileUploadStart(state, action);
    case actionTypes.NEW_FILE_UPLOAD_SUCCESS:
      return newFileUploadSuccess(state, action);
    case actionTypes.NEW_FILE_UPLOAD_FAIL:
      return newFileUploadFail(state, action);
    case actionTypes.SPLIT_PARSED_DATA:
      return splitParsedData(state, action);
    case actionTypes.SET_FIELD_TYPES:
      return setFieldTypes(state, action);
    case actionTypes.UPDATE_USER_DEF_FIELD_TYPES:
      return updateUserDefFieldType(state, action);
    case actionTypes.FILES_READY_TO_UPLOAD:
      return filesReadyToUpload(state);
    case actionTypes.FILES_NOT_READY_TO_UPLOAD:
      return filesNotReadyToUpload(state);
    default:
      return state;
  }
};

export default reducer;
