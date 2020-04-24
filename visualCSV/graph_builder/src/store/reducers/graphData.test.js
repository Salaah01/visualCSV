/**Unit tests for the graphData reducer */

// IMPORTS
// Third Party Imports

// Local Imports
import graphDataReducer from './graphData';
import * as actionTypes from '../actions/actionTypes';

describe('SET_USER_TABLES_DATA', () => {
  const state = {
    columns: {},
    tables: {},
    sections: {
      xAxis: {
        id: 'xAxis',
        column: null,
      },
      legends: {
        id: 'legends',
        columns: [],
      },
      tables: {
        id: 'tables',
        tables: [],
      },
    },
  };

  const data = {
    table_1: {
      tableAlias: 'table 1',
      columns: {
        column_1__table_1: {
          columnName: 'column 1',
          dataType: 'numeric',
        },
        column_2__table_1: {
          columnName: 'column 2',
          dataType: 'character',
        },
      },
    },
    table_2: {
      tableAlias: 'table 2',
      columns: {
        column_1__table_2: {
          columnName: 'column 1',
          dataType: 'integer',
        },
        column_2__table_2: {
          columnName: 'column 2',
          dataType: 'boolean',
        },
      },
    },
  };

  it('should update the state with new user tables data.', () => {
    const reducer = graphDataReducer(state, {
      type: actionTypes.SET_USER_TABLES_DATA,
      data: data,
    });

    expect(reducer).toEqual({
      columns: {
        column_1__table_1: {
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          tableAlias: 'table 1',
          columns: ['column_1__table_1', 'column_2__table_1'],
        },
        table_2: {
          tableAlias: 'table 2',
          columns: ['column_1__table_2', 'column_2__table_2'],
        },
      },
      sections: {
        xAxis: { id: 'xAxis', column: null },
        legends: { id: 'legends', columns: [] },
        tables: {
          id: 'tables',
          tables: ['table_1', 'table_2'],
        },
      },
    });
  });
});
