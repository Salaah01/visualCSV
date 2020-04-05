/**Unit tests for the filesInfo reducer. */

// IMPORTS
// Third Party Imports

// Local Imports
import filesInfoReducer, { fileStates } from './filesInfo';
import * as actionTypes from '../actions/actionTypes';

describe('ATTEMPT_UPLOAD_NEW_FILE', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.ATTEMPT_UPLOAD_NEW_FILE,
    fileName: 'f3',
    id: 5
  });

  it('should add an new file to the store and set as processing.', () => {
    expect(reducer.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      5: { name: 'f3', status: fileStates.PARSING_CSV_IN_PROGRESS },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
    });
  });
});

describe('ATTEMPT_NEW_FILE_PARSE_SUCCESS', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.NEW_FILE_PARSE_SUCCESS,
    id: 1,
  });

  it('should update file 1 to PARSING_CSV_SUCCESS.', () => {
    expect(reducer.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_SUCCESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    });
  });
});

describe('ATTEMPT_NEW_FILE_PARSE_FAIL', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.NEW_FILE_PARSE_FAIL,
    id: 1,
  });

  it('should update file 1 to PARSING_CSV_FAIL.', () => {
    expect(reducer.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_FAIL },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.files).toEqual({
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    });
  });
});

describe('parseCSV', () => {
  let reader
  let reducer

  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    },
  };

  beforeEach(() => {
    reader = new FileReader()
    reader.onload(
      re
    )
  })
})
