import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../../../coreFunctions/js/updateObject";

const initialState = {
  files: {},
};

export const fileStates = {
  PARSING_CSV_IN_PROGRESS: "PARSING_CSV_IN_PROGRESS",
  PARSING_CSV_SUCCESS: "PARSING_CSV_SUCCESS",
  PARSING_CSV_FAIL: "PARSING_CSV_FAIL",
};

const attemptUploadNewFile = (state, action) => {
  const newFile = updateObject(state.files, {
    [action.fileName]: fileStates.PARSING_CSV_IN_PROGRESS,
  });
  return updateObject(state, newFile);
};

const newFileParseSuccess = (state, action) => {
  const newFile = updateObject(state.files, {
    [action.fileName]: fileStates.PARSING_CSV_SUCCESS,
  });
  return updateObject(state, newFile);
};

const newFileParseFail = (state, action) => {
  const newFile = updateObject(state.files, {
    [action.fileName]: fileStates.PARSING_CSV_FAIL,
  });
  return updateObject(state, newFile);
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
