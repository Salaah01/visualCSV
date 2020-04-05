/**Unit tests for the filesInfo reducer. */

// IMPORTS
// Third Party Imports

// Local Imports
import filesInfoReducer, { fileStates } from './filesInfo';
import * as actionTypes from '../actions/actionTypes';

describe('NEW_FILE_UPLOAD_START', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.NEW_FILE_UPLOAD_START,
    fileName: 'f3',
    id: 5,
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

describe('NEW_FILE_UPLOAD_SUCCESS', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.NEW_FILE_UPLOAD_SUCCESS,
    id: 1,
    data: { a: [1, 2, 3], b: [4, 5, 6] },
  });

  it('should update file 1 to PARSING_CSV_SUCCESS.', () => {
    expect(reducer.files).toEqual({
      1: {
        name: 'f1',
        status: fileStates.PARSING_CSV_SUCCESS,
        data: { a: [1, 2, 3], b: [4, 5, 6] },
      },
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

describe('NEW_FILE_UPLOAD_FAIL', () => {
  const state = {
    files: {
      1: { name: 'f1', status: fileStates.PARSING_CSV_IN_PROGRESS },
      4: { name: 'f2', status: fileStates.PARSING_CSV_FAIL },
      6: { name: 'f3', status: fileStates.PARSING_CSV_SUCCESS },
    },
  };
  const reducer = filesInfoReducer(state, {
    type: actionTypes.NEW_FILE_UPLOAD_FAIL,
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

describe('SPLIT_PARSED_DATA', () => {
  const reducerPassed = () => {
    const state = {
      files: {
        a: {
          data: [
            ['a', 'b', 'c'],
            [1, 2, 3],
            [4, 5, 6],
          ],
        },
      },
    };

    return filesInfoReducer(state, {
      type: actionTypes.SPLIT_PARSED_DATA,
      id: 'a',
    });
  };

  const reducerFailed = () => {
    const state = {
      files: {
        a: {
          data: 'Hello World',
        },
      },
    };

    return filesInfoReducer(state, {
      type: actionTypes.SPLIT_PARSED_DATA,
      id: 'a',
    });
  };

  it('should split the headers and the data content.', () => {
    expect(reducerPassed().files.a.header).toEqual(['a', 'b', 'c']);
    expect(reducerPassed().files.a.content).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should set headers and content to null when there is no content.', () => {
    const state = {
      files: {
        a: {
          data: [['a', 'b', 'c']],
        },
      },
    };

    const reducer = filesInfoReducer(state, {
      type: actionTypes.SPLIT_PARSED_DATA,
      id: 'a',
    });

    expect(reducer.files.a.header).toEqual(null);
    expect(reducer.files.a.content).toEqual(null);
  });

  it('should set headers to null when the data object is not of the expected type.', () => {
    expect(reducerFailed().files.a.header).toEqual(null);
  });

  it('should set content to null when the data object is not of the expected type.', () => {
    expect(reducerFailed().files.a.content).toEqual(null);
  });

  it('should keep the status as passed if the data is split correctly.', () => {
    expect((reducerPassed().files.a.status = fileStates.PARSING_CSV_SUCCESS));
  });

  it('should updated status to indicate that parsing has failed if the data cannot be split.', () => {
    expect((reducerFailed().files.a.status = fileStates.PARSING_CSV_FAIL));
  });
});

describe('SET_FIELD_TYPES', () => {
  const state = {
    files: {
      a: {
        content: [
          [1234, 1234, '01/12/2013'],
          ['01/12/2012', 338412, '05/01/2017'],
          ['Hello World', 4823, '05/02/2020'],
        ],
        status: fileStates.PARSING_CSV_SUCCESS,
      },
    },
  };

  const reducer = filesInfoReducer(state, {
    type: actionTypes.SET_FIELD_TYPES,
    id: 'a',
  });

  it('should return the correct set of file types.', () => {
    expect(reducer.files.a.fieldTypes).toEqual(['string', 'number', 'date']);
  });

  it('should not mutate the original state.', () => {
    expect(state.files.a).toEqual({
      content: [
        [1234, 1234, '01/12/2013'],
        ['01/12/2012', 338412, '05/01/2017'],
        ['Hello World', 4823, '05/02/2020'],
      ],
      status: fileStates.PARSING_CSV_SUCCESS,
    });
  });
});
