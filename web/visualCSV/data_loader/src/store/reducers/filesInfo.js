/**Contains the redux reducers related to the files being uploaded. These
 * include:
 *  newFileUploadStart: Starts the upload process for a file. This process
 *    involves storing the file ID and file name s well as instantiating a
 *    null-ish value for the primary and foreign key.
 *  newFileUploadSuccess: Sets the status to indicate that the file could be
 *    read and stores the data. Also adds the table name to the list of tables.
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
 *  setPrimaryKey: Updates a file with a new new primary key.
 *  setForeignKey: Sets a foreign key to a header of a given file.
 *  removeForeignKey: Removes a foreign key.
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
  tables: {
    existing: document.getElementById('user-tables-data')
      ? JSON.parse(document.getElementById('user-tables-data').textContent)
      : '',
    new: [],
  },
};

export const fileStates = {
  PARSING_CSV_IN_PROGRESS: 'PARSING_CSV_IN_PROGRESS',
  PARSING_CSV_SUCCESS: 'PARSING_CSV_SUCCESS',
  PARSING_CSV_FAIL: 'PARSING_CSV_FAIL',
};

const newFileUploadStart = (state, action) => {
  /**Starts the upload process for a file. This process  involves storing the
   * file ID and file name as well as instantiating a null-ish value for the
   * primary and foreign key.
   */
  const updatedFiles = updateObject(state.files, {
    [action.id]: {
      name: action.fileName,
      status: fileStates.PARSING_CSV_IN_PROGRESS,
      primaryKey: '',
      foreignKeys: {},
    },
  });

  return updateObject(state, { files: updatedFiles });
};

const newFileUploadSuccess = (state, action) => {
  /**Sets the status to indicate that the file could be read and stores the
   * data as well as adding the file name to the list of tables.
   */
  const updatedFile = {
    ...state.files[action.id],
    status: fileStates.PARSING_CSV_SUCCESS,
    data: action.data,
  };
  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });
  const newTableNames = [...state.tables.new, action.id];
  const updatedTables = updateObject(state.tables, { new: newTableNames });

  return updateObject(state, {
    files: updatedFiles,
    tables: updatedTables,
  });
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
    headers: headers,
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

const setPrimaryKey = (state, action) => {
  /**Updates a file with a new new primary key. */
  const updatedPK = { ...state.files[action.id], primaryKey: action.pk };

  const updatedFiles = updateObject(state.files, { [action.id]: updatedPK });

  return updateObject(state, { files: updatedFiles });
};

const setForeignKey = (state, action) => {
  /**Sets a foreign key to a header of a given file. */
  const updatedFK = {
    ...state.files[action.id].foreignKeys,
    [action.header]: action.fk,
  };

  const updatedFile = updateObject(state.files[action.id], {foreignKeys: updatedFK})
  const updatedFiles = updateObject(state.files, {[action.id]: updatedFile})

  return updateObject(state, {files: updatedFiles})
};

const removeForeignKey = (state, action) => {
  /**Removes a foreign key. */
  const foreignKeysCopy = {...state.files[action.id].foreignKeys}
  delete(foreignKeysCopy[action.header])

  const updatedFile = updateObject(state.files[action.id], {foreignKeys: foreignKeysCopy})
  const updatedFiles = updateObject(state.files, {[action.id]: updatedFile})

  return updateObject(state, {files: updatedFiles})
}

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
    case actionTypes.SET_PRIMARY_KEY:
      return setPrimaryKey(state, action);
    case actionTypes.SET_FOREIGN_KEY:
      return setForeignKey(state, action);
    case actionTypes.REMOVE_FOREIGN_KEY:
      return removeForeignKey(state, action)
    default:
      return state;
  }
};

export default reducer;
