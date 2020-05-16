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

describe('SET_COLUMN_DATA', () => {
  const state = {
    columns: {
      column_1__table_1: { id: 'column_1__table_1', columnName: 'column 1' },
      column_2__table_2: { id: 'column_2__table_2', columnName: 'column 2' },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.SET_COLUMN_DATA,
    table: 'table_1',
    column: 'column_1',
    data: [1, 2, 3, 4, 5],
  });

  it('should add the data to `column_1__table_1`', () => {
    expect(reducer).toEqual({
      columns: {
        column_1__table_1: {
          id: 'column_1__table_1',
          columnName: 'column 1',
          data: [1, 2, 3, 4, 5],
        },
        column_2__table_2: { id: 'column_2__table_2', columnName: 'column 2' },
      },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1__table_1: { id: 'column_1__table_1', columnName: 'column 1' },
        column_2__table_2: { id: 'column_2__table_2', columnName: 'column 2' },
      },
    });
  });
});

describe('ADD_DATA_SET', () => {
  const state = {
    columns: { column_1: { data: [1, 2, 3, 4], columnName: 'column 1' } },
    dataSets: {},
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.ADD_DATA_SET,
    columnID: 'column_1',
    label: 'new column',
    bgColour: 'blue',
    borderColour: 'black',
    borderWidth: 10,
  });

  it('should add `column_1` as a dataset.', () => {
    expect(reducer.dataSets).toEqual({
      column_1: {
        label: 'new column',
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 10,
        data: [1, 2, 3, 4],
        index: 0,
      },
    });
  });

  it('should set the `columnName` as the label.', () => {
    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_1',
      bgColour: 'blue',
      borderColour: 'black',
      borderWidth: 10,
    });

    expect(reducer.dataSets).toEqual({
      column_1: {
        label: 'column 1',
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 10,
        data: [1, 2, 3, 4],
        index: 0,
      },
    });
  });

  it('should set `dataSets.column_1` as an empty array.', () => {
    const state = {
      columns: { column_1: { columnName: 'column 1' } },
      dataSets: {},
    };

    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_1',
      bgColour: 'blue',
      borderColour: 'black',
      borderWidth: 10,
      label: 'column 1',
    });

    expect(reducer.dataSets).toEqual({
      column_1: {
        label: 'column 1',
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 10,
        data: [],
        index: 0,
      },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: { column_1: { data: [1, 2, 3, 4], columnName: 'column 1' } },
      dataSets: {},
    });
  });

  it('should set the data to be the set of the data provided.', () => {
    const state = {
      columns: { column_1: { data: [1, 2, 2, 4, 4], columnName: 'column 1' } },
      dataSets: {},
    };

    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_1',
      label: 'new column',
      aggregation: 'COUNT',
      axis: 'x',
    });

    expect(reducer.dataSets.column_1.data).toEqual([1, 2, 4]);
  });

  it('should aggregate the data (COUNT).', () => {
    const state = {
      columns: {
        column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
        column_2: { data: [10, 20, 30], columnName: 'column 2' },
      },
      sections: { xAxis: { column: ['column_1'] } },
      dataSets: {},
    };

    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_2',
      label: 'new column',
      aggregation: 'COUNT',
      axis: 'y',
    });

    expect(reducer.dataSets.column_2.data).toEqual([2, 1]);
  });

  it('should aggregate the data (SUM).', () => {
    const state = {
      columns: {
        column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
        column_2: { data: [10, 20, 30], columnName: 'column 2' },
      },
      sections: { xAxis: { column: ['column_1'] } },
      dataSets: {},
    };

    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_2',
      label: 'new column',
      aggregation: 'SUM',
      axis: 'y',
    });

    expect(reducer.dataSets.column_2.data).toEqual([30, 30]);
  });

  it('should aggregate the data (AVERAGE).', () => {
    const state = {
      columns: {
        column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
        column_2: { data: [10, 20, 30], columnName: 'column 2' },
      },
      sections: { xAxis: { column: ['column_1'] } },
      dataSets: {},
    };

    const reducer = graphDataReducer(state, {
      type: actionTypes.ADD_DATA_SET,
      columnID: 'column_2',
      label: 'new column',
      aggregation: 'AVERAGE',
      axis: 'y',
    });

    expect(reducer.dataSets.column_2.data).toEqual([15, 30]);
  });
});

describe('RE_AGGREGATE', () => {
  const state = {
    columns: {
      column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
      column_2: { data: [10, 20, 30], columnName: 'column 2' },
      column_3: { data: [1, 2, 3], columnName: 'column 3' },
      column_4: { data: [4, 5, 6], columnName: 'column 4' },
    },
    sections: { xAxis: { column: ['column_1'] } },
    dataSets: {
      column_1: { colour: 1, data: ['a'] },
      column_2: { colour: 1, data: [60] },
      column_3: { colour: 5, data: [6] },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.RE_AGGREGATE,
    method: 'COUNT',
  });

  it('the a-axis should not contain any repeated keys..', () => {
    expect(reducer.dataSets.column_1).toEqual({ colour: 1, data: ['a', 'b'] });
  });

  it('should aggregate the legends using the count method.', () => {
    expect(reducer.dataSets.column_2).toEqual({ colour: 1, data: [2, 1] });
    expect(reducer.dataSets.column_3).toEqual({ colour: 5, data: [2, 1] });
  });

  it('should not include column 4.', () => {
    expect(reducer.dataSets.column_4).toEqual(undefined);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
        column_2: { data: [10, 20, 30], columnName: 'column 2' },
        column_3: { data: [1, 2, 3], columnName: 'column 3' },
        column_4: { data: [4, 5, 6], columnName: 'column 4' },
      },
      sections: { xAxis: { column: ['column_1'] } },
      dataSets: {
        column_1: { colour: 1, data: ['a'] },
        column_2: { colour: 1, data: [60] },
        column_3: { colour: 5, data: [6] },
      },
    });
  });
});

describe('UN_AGGREGATE', () => {
  const state = {
    columns: {
      column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
      column_2: { data: [10, 20, 30], columnName: 'column 2' },
      column_3: { data: [1, 2, 3], columnName: 'column 3' },
      column_4: { data: [4, 5, 6], columnName: 'column 4' },
    },
    sections: { xAxis: { column: ['column_1'] } },
    dataSets: {
      column_1: { columnName: 'column 1', data: ['a'] },
      column_2: { columnName: 'column 2', data: [60] },
      column_3: { columnName: 'column 3', data: [6] },
    },
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.UN_AGGREGATE,
  });

  it('should reset the `dataSets` for columns 1-3', () => {
    expect(reducer.dataSets.column_1).toEqual({
      data: ['a', 'a', 'b'],
      columnName: 'column 1',
    });
    expect(reducer.dataSets.column_2).toEqual({
      data: [10, 20, 30],
      columnName: 'column 2',
    });
    expect(reducer.dataSets.column_3).toEqual({
      data: [1, 2, 3],
      columnName: 'column 3',
    });
  });

  it('should not include `column_4` in the `dataSets`.', () => {
    expect(reducer.dataSets.column_4).toEqual(undefined);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      columns: {
        column_1: { data: ['a', 'a', 'b'], columnName: 'column 1' },
        column_2: { data: [10, 20, 30], columnName: 'column 2' },
        column_3: { data: [1, 2, 3], columnName: 'column 3' },
        column_4: { data: [4, 5, 6], columnName: 'column 4' },
      },
      sections: { xAxis: { column: ['column_1'] } },
      dataSets: {
        column_1: { columnName: 'column 1', data: ['a'] },
        column_2: { columnName: 'column 2', data: [60] },
        column_3: { columnName: 'column 3', data: [6] },
      },
    });
  });
});

describe('UPDATE_DATA_SET_COLOUR', () => {
  const state = {
    dataSets: {
      column_1: {
        label: 'column_1',
        backgroundColor: 'red',
        borderColor: 'dark red',
      },
      column_2: {
        label: 'column_2',
        backgroundColor: 'blue',
        borderColor: 'dark blue',
      },
    },
    type: 'bar',
  };

  const reducer = graphDataReducer(state, {
    type: actionTypes.UPDATE_DATA_SET_COLOUR,
    columnID: 'column_1',
    colour: { r: 255, g: 25, b: 2 },
  });

  it('should update the colour for `column_1`.', () => {
    expect(reducer.dataSets.column_1).toEqual({
      label: 'column_1',
      backgroundColor: 'rgba(255, 25, 2, 1)',
      borderColor: 'rgba(255, 25, 2, 0.6)',
    });
  });

  it('should not affect `column_2`.', () => {
    expect(reducer.dataSets.column_2).toEqual({
      label: 'column_2',
      backgroundColor: 'blue',
      borderColor: 'dark blue',
    });
  });

  it("should not lose the `type` info. (prevent bad override).", () => {
    expect(reducer.type).toEqual('bar')
  })

  it("should not mutate the original state.", () => {
    expect(state).toEqual({
      dataSets: {
        column_1: {
          label: 'column_1',
          backgroundColor: 'red',
          borderColor: 'dark red',
        },
        column_2: {
          label: 'column_2',
          backgroundColor: 'blue',
          borderColor: 'dark blue',
        },
      },
      type: 'bar',
    })
  })
});
