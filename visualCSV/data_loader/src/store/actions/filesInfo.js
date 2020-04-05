import csv from 'csv';
import * as actionTypes from './actionTypes';

export const attemptUploadNewFile = (id, fileName) => {
  return {
    type: actionTypes.ATTEMPT_UPLOAD_NEW_FILE,
    id: id,
    fileName: fileName,
  };
};

export const newFileParseSuccess = (id) => {
  return {
    type: actionTypes.NEW_FILE_PARSE_SUCCESS,
    id: id,
  };
};

export const newFileParseFail = (id) => {
  return {
    type: actionTypes.NEW_FILE_PARSE_FAIL,
    id: id,
  };
};

const readCSVData = (reader) => {
  new Promise((resolve, reject) => {
    try {
      csv.parse(reader.result, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(console.log('failed to parse CSV', err));
        }
      });
    } catch (err) {
      reject(console.log('Unsupported file.'));
    }
  });
};

export const parseCSV = (id, name) => {
  return (dispatch) => {
    dispatch(attemptUploadNewFile(name));

    const reader = new FileReader();
    console.log('reader load ');
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading failed');
    reader.onloadend = () => {
      console.log('reader loade');
      readCSVData(reader)
        .then((result) => {
          return dispatch(newFileParseSuccess(id));
        })
        .catch(dispatch(newFileParseFail(id)));
    };
  };
};
