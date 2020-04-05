import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../../../coreFunctions/js/updateObject';

const initialState = {
  files: {},
};

export const fileStates = {
  PARSING_CSV_IN_PROGRESS: 'PARSING_CSV_IN_PROGRESS',
  PARSING_CSV_SUCCESS: 'PARSING_CSV_SUCCESS',
  PARSING_CSV_FAIL: 'PARSING_CSV_FAIL',
};

const attemptUploadNewFile = (state, action) => {
  const keys = Object.keys(state.files);
  let nextKeyId;
  if (keys.length) {
    nextKeyId =
      Math.max.apply(
        null,
        keys.map((key) => +key),
      ) + 1;
  } else {
    nextKeyId = 1;
  }

  const updatedFiles = updateObject(state.files, {
    [action.id]: {
      name: action.fileName,
      status: fileStates.PARSING_CSV_IN_PROGRESS,
    },
  });

  return updateObject(state, { files: updatedFiles });
};

const newFileParseSuccess = (state, action) => {
  const updatedFile = {
    ...state.files[action.id],
    status: fileStates.PARSING_CSV_SUCCESS,
  };
  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });

  return updateObject(state, { files: updatedFiles });
};

const newFileParseFail = (state, action) => {
  const updatedFile = {
    ...state.files[action.id],
    status: fileStates.PARSING_CSV_FAIL,
  };
  const updatedFiles = updateObject(state.files, { [action.id]: updatedFile });

  return updateObject(state, { files: updatedFiles });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ATTEMPT_UPLOAD_NEW_FILE:
      return attemptUploadNewFile(state, action);
    case actionTypes.NEW_FILE_PARSE_SUCCESS:
      return newFileParseSuccess(state, action);
    case actionTypes.NEW_FILE_PARSE_FAIL:
      return newFileParseFail(state, action);
    default:
      return state;
  }
};

export default reducer;
