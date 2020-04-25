/**Unit tests for the graphData reducer */

// IMPORTS
// Third Party Imports

// Local Imports
import graphDataReducer from './graphData';
import * as actionTypes from '../actions/actionTypes';
import reducer from './graphData';

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
          id: 'column_1__table_1',
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          id: 'column_2__table_1',
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          id: 'column_1__table_2',
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          id: 'column_2__table_2',
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          id: 'table_1',
          tableAlias: 'table 1',
          columns: ['column_1__table_1', 'column_2__table_1'],
        },
        table_2: {
          id: 'table_2',
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

describe('SET_COLUMN_AS_X_AXIS (tables to x-axis)', () => {
  const state = {
    columns: {
      column_1__table_1: {
        id: 'column_1__table_1',
        columnName: 'column 1',
        dataType: 'numeric',
        table: 'table_1',
      },
      column_2__table_1: {
        id: 'column_2__table_1',
        columnName: 'column 2',
        dataType: 'character',
        table: 'table_1',
      },
      column_1__table_2: {
        id: 'column_1__table_2',
        columnName: 'column 1',
        dataType: 'integer',
        table: 'table_2',
      },
      column_2__table_2: {
        id: 'column_2__table_2',
        columnName: 'column 2',
        dataType: 'boolean',
        table: 'table_2',
      },
    },
    tables: {
      table_1: {
        id: 'table_1',
        tableAlias: 'table 1',
        columns: ['column_1__table_1', 'column_2__table_1'],
      },
      table_2: {
        id: 'table_2',
        tableAlias: 'table 2',
        columns: ['column_1__table_2', 'column_2__table_2'],
      },
    },
    sections: {
      xAxis: { id: 'xAxis', column: [] },
      legends: { id: 'legends', columns: [] },
      tables: {
        id: 'tables',
        tables: ['table_1', 'table_2'],
      },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.SET_COLUMN_AS_X_AXIS,
    tableID: 'table_1',
    columnID: 'column_1__table_1',
    source: 'tables',
  });

  it('should move `column1__table_1 to the x-axis axis.', () => {
    expect(reducer.sections.xAxis.column).toEqual(['column_1__table_1']);
  });

  it('should remove `column1__table_1` from table_1.', () => {
    expect(reducer.tables.table_1.columns).toEqual(['column_2__table_1']);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1__table_1: {
          id: 'column_1__table_1',
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          id: 'column_2__table_1',
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          id: 'column_1__table_2',
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          id: 'column_2__table_2',
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          id: 'table_1',
          tableAlias: 'table 1',
          columns: ['column_1__table_1', 'column_2__table_1'],
        },
        table_2: {
          id: 'table_2',
          tableAlias: 'table 2',
          columns: ['column_1__table_2', 'column_2__table_2'],
        },
      },
      sections: {
        xAxis: { id: 'xAxis', column: [] },
        legends: { id: 'legends', columns: [] },
        tables: {
          id: 'tables',
          tables: ['table_1', 'table_2'],
        },
      },
    });
  });
});

describe('SET_COLUMN_AS_X_AXIS (legend to x-axis)', () => {
  const state = {
    columns: {
      column_1__table_1: {
        id: 'column_1__table_1',
        columnName: 'column 1',
        dataType: 'numeric',
        table: 'table_1',
      },
      column_2__table_1: {
        id: 'column_2__table_1',
        columnName: 'column 2',
        dataType: 'character',
        table: 'table_1',
      },
      column_1__table_2: {
        id: 'column_1__table_2',
        columnName: 'column 1',
        dataType: 'integer',
        table: 'table_2',
      },
      column_2__table_2: {
        id: 'column_2__table_2',
        columnName: 'column 2',
        dataType: 'boolean',
        table: 'table_2',
      },
    },
    tables: {
      table_1: {
        id: 'table_1',
        tableAlias: 'table 1',
        columns: ['column_2__table_1'],
      },
      table_2: {
        id: 'table_2',
        tableAlias: 'table 2',
        columns: ['column_1__table_2'],
      },
    },
    sections: {
      xAxis: { id: 'xAxis', column: [] },
      legends: {
        id: 'legends',
        columns: ['column_1__table_1', 'column_2__table_2'],
      },
      tables: {
        id: 'tables',
        tables: ['table_1', 'table_2'],
      },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.SET_COLUMN_AS_X_AXIS,
    tableID: null,
    columnID: 'column_1__table_1',
    source: 'legends',
  });

  const reducer2 = graphDataReducer(reducer, {
    type: actionTypes.SET_COLUMN_AS_X_AXIS,
    tableID: null,
    columnID: 'column_1__table_2',
  });

  it('should move `column1__table_1 to the x-axis axis.', () => {
    expect(reducer.sections.xAxis.column).toEqual(['column_1__table_1']);
  });

  it('should remove `column1__table_1` from the legends.', () => {
    expect(reducer.sections.legends.columns).toEqual(['column_2__table_2']);
  });

  it('should replace the column with the new column.', () => {
    expect(reducer2.sections.xAxis.column).toEqual(['column_1__table_2']);
  });

  it('should return `column1__table_1` back to the tables.', () => {
    expect(reducer2.tables.table_1.columns).toEqual([
      'column_2__table_1',
      'column_1__table_1',
    ]);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1__table_1: {
          id: 'column_1__table_1',
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          id: 'column_2__table_1',
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          id: 'column_1__table_2',
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          id: 'column_2__table_2',
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          id: 'table_1',
          tableAlias: 'table 1',
          columns: ['column_2__table_1'],
        },
        table_2: {
          id: 'table_2',
          tableAlias: 'table 2',
          columns: ['column_1__table_2'],
        },
      },
      sections: {
        xAxis: { id: 'xAxis', column: [] },
        legends: {
          id: 'legends',
          columns: ['column_1__table_1', 'column_2__table_2'],
        },
        tables: {
          id: 'tables',
          tables: ['table_1', 'table_2'],
        },
      },
    });
  });
});

describe('MOVE_COLUMN_TO_LEGENDS (tables to legends)', () => {
  const state = {
    columns: {
      column_1__table_1: {
        id: 'column_1__table_1',
        columnName: 'column 1',
        dataType: 'numeric',
        table: 'table_1',
      },
      column_2__table_1: {
        id: 'column_2__table_1',
        columnName: 'column 2',
        dataType: 'character',
        table: 'table_1',
      },
      column_1__table_2: {
        id: 'column_1__table_2',
        columnName: 'column 1',
        dataType: 'integer',
        table: 'table_2',
      },
      column_2__table_2: {
        id: 'column_2__table_2',
        columnName: 'column 2',
        dataType: 'boolean',
        table: 'table_2',
      },
    },
    tables: {
      table_1: {
        id: 'table_1',
        tableAlias: 'table 1',
        columns: ['column_1__table_1', 'column_2__table_1'],
      },
      table_2: {
        id: 'table_2',
        tableAlias: 'table 2',
        columns: ['column_1__table_2', 'column_2__table_2'],
      },
    },
    sections: {
      xAxis: { id: 'xAxis', column: [] },
      legends: { id: 'legends', columns: [] },
      tables: {
        id: 'tables',
        tables: ['table_1', 'table_2'],
      },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.MOVE_COLUMN_TO_LEGENDS,
    tableID: 'table_1',
    columnID: 'column_1__table_1',
    source: 'tables',
  });

  it('should move `column1__table_1 to the legends.', () => {
    expect(reducer.sections.legends.columns).toEqual(['column_1__table_1']);
  });

  it('should remove `column1__table_1` from table_1.', () => {
    expect(reducer.tables.table_1.columns).toEqual(['column_2__table_1']);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1__table_1: {
          id: 'column_1__table_1',
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          id: 'column_2__table_1',
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          id: 'column_1__table_2',
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          id: 'column_2__table_2',
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          id: 'table_1',
          tableAlias: 'table 1',
          columns: ['column_1__table_1', 'column_2__table_1'],
        },
        table_2: {
          id: 'table_2',
          tableAlias: 'table 2',
          columns: ['column_1__table_2', 'column_2__table_2'],
        },
      },
      sections: {
        xAxis: { id: 'xAxis', column: [] },
        legends: { id: 'legends', columns: [] },
        tables: {
          id: 'tables',
          tables: ['table_1', 'table_2'],
        },
      },
    });
  });
});

describe('MOVE_COLUMN_TO_TABLES', () => {
  const state = {
    columns: {
      column_1__table_1: {
        id: 'column_1__table_1',
        columnName: 'column 1',
        dataType: 'numeric',
        table: 'table_1',
      },
      column_2__table_1: {
        id: 'column_2__table_1',
        columnName: 'column 2',
        dataType: 'character',
        table: 'table_1',
      },
      column_1__table_2: {
        id: 'column_1__table_2',
        columnName: 'column 1',
        dataType: 'integer',
        table: 'table_2',
      },
      column_2__table_2: {
        id: 'column_2__table_2',
        columnName: 'column 2',
        dataType: 'boolean',
        table: 'table_2',
      },
    },
    tables: {
      table_1: {
        id: 'table_1',
        tableAlias: 'table 1',
        columns: ['column_2__table_1'],
      },
      table_2: {
        id: 'table_2',
        tableAlias: 'table 2',
        columns: ['column_1__table_2'],
      },
    },
    sections: {
      xAxis: { id: 'xAxis', column: ['column_2__table_2'] },
      legends: { id: 'legends', columns: ['column_1__table_1'] },
      tables: {
        id: 'tables',
        tables: ['table_1', 'table_2'],
      },
    },
  };

  const reducerLegendToTable = graphDataReducer(state, {
    type: actionTypes.MOVE_COLUMN_TO_TABLES,
    columnID: 'column_1__table_1',
    source: 'legends',
    destinationID: 'table_1',
    destinationIndex: 0,
  });

  const reducerXAxisToTable = graphDataReducer(state, {
    type: actionTypes.MOVE_COLUMN_TO_TABLES,
    columnID: 'column_2__table_2',
    source: 'x-axis',
    destinationID: 'table_2',
    destinationIndex: 1,
  });

  const reducerWrongDest = graphDataReducer(state, {
    type: actionTypes.MOVE_COLUMN_TO_TABLES,
    columnID: 'column_1__table_1',
    source: 'legends',
    destinationID: 'table_2',
    destinationIndex: 0,
  });

  it('should move `column_1__table_1` back to the table columns at index 0.', () => {
    expect(reducerLegendToTable.tables.table_1.columns).toEqual([
      'column_1__table_1',
      'column_2__table_1',
    ]);
  });

  it('should remove `column_1__table_1` from the legends.', () => {
    expect(reducerLegendToTable.sections.legends.columns).toEqual([]);
  });

  it('should move `column_2__table_2` back to the table columns at index 1.', () => {
    expect(reducerXAxisToTable.tables.table_2.columns).toEqual([
      'column_1__table_2',
      'column_2__table_2',
    ]);
  });

  it('should remove `column_2__table_2` from the x-axis column.', () => {
    expect(reducerXAxisToTable.sections.xAxis.column).toEqual([]);
  });

  it('should push `column_1__table_1` back its correct table (table_1).', () => {
    expect(reducerWrongDest.tables.table_1.columns).toEqual([
      'column_2__table_1',
      'column_1__table_1',
    ]);
  });

  it('should not add `column_1__table_1` to table 2 columns.', () => {
    expect(reducerWrongDest.tables.table_2.columns).toEqual([
      'column_1__table_2',
    ]);
  });

  it('should remove `column_1__table_1` from the legends.', () => {
    expect(reducerWrongDest.sections.legends.columns).toEqual([]);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1__table_1: {
          id: 'column_1__table_1',
          columnName: 'column 1',
          dataType: 'numeric',
          table: 'table_1',
        },
        column_2__table_1: {
          id: 'column_2__table_1',
          columnName: 'column 2',
          dataType: 'character',
          table: 'table_1',
        },
        column_1__table_2: {
          id: 'column_1__table_2',
          columnName: 'column 1',
          dataType: 'integer',
          table: 'table_2',
        },
        column_2__table_2: {
          id: 'column_2__table_2',
          columnName: 'column 2',
          dataType: 'boolean',
          table: 'table_2',
        },
      },
      tables: {
        table_1: {
          id: 'table_1',
          tableAlias: 'table 1',
          columns: ['column_2__table_1'],
        },
        table_2: {
          id: 'table_2',
          tableAlias: 'table 2',
          columns: ['column_1__table_2'],
        },
      },
      sections: {
        xAxis: { id: 'xAxis', column: ['column_2__table_2'] },
        legends: { id: 'legends', columns: ['column_1__table_1'] },
        tables: {
          id: 'tables',
          tables: ['table_1', 'table_2'],
        },
      },
    });
  });
});
