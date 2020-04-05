import csv from "csv";
import * as actionTypes from "./actionTypes";

export const attemptUploadNewFile = (fileName) => {
  return {
    type: actionTypes.ATTEMPT_UPLOAD_NEW_FILE,
    fileName: fileName,
  };
};

export const newFileParseSuccess = (fileName) => {
  return {
    type: actionTypes.NEW_FILE_PARSE_SUCCESS,
    fileName: fileName,
  };
};

export const newFileParseFail = (fileName) => {
  return {
    type: actionTypes.NEW_FILE_PARSE_FAIL,
    fileName: fileName,
  };
};

// export const parseCSV = reader => {
//     return dispatch => {
//         dispatch(attemptUploadNewFile())
//     }
// }