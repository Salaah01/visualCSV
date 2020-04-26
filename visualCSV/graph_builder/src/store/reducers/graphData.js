/**Redux reducer that is used for building the main graph. These include:
 *  setUserTablesData: Stores data on the user's tables once retrieved.
 *  setColumnAsXAxis: Sets a column as the x-Axis.
 *  moveColumnToLegends: Moves a column to the legends section.
 *  moveColumnToTables: Moves a column back to its table.
 *  setColumnData: Stores the data belonging to a column.
 */

// IMPORTS
// Third Party Imports

// Local Imports
import { updateObject } from '../../../../core_functions/js';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  columns: {},
  tables: {},
  sections: {
    xAxis: {
      id: 'xAxis',
      column: [],
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

const setUserTablesData = (state, action) => {
  /**Stores data on the user's tables once retrieved. */
  const tableNames = Object.keys(action.data);

  // Tables object will contain a collection of table names, their aliases and
  // column names.
  const tables = { ...state.tables };

  // Column object will contain a collection of columns from all the tables.
  // The API ensures that each column is unique by concatenating the column
  // name to the table name for each column.
  // Each column will also contain additional information regarding itself.
  const columns = { ...state.columns };

  for (const tableName of tableNames) {
    const targetTable = action.data[tableName];
    const targetColumns = targetTable.columns;
    const targetColumnsNames = Object.keys(targetColumns);

    // Add to the tables objects.
    tables[tableName] = {
      id: tableName,
      tableAlias: targetTable.tableAlias,
      columns: targetColumnsNames,
    };

    // Add tp the columns object.
    for (const targetColumnName of targetColumnsNames) {
      const targetColumn = targetColumns[targetColumnName];
      columns[targetColumnName] = {
        id: targetColumnName,
        columnName: targetColumn.columnName,
        dataType: targetColumn.dataType,
        table: tableName,
      };
    }
  }

  // Build the new state.
  const newState = {
    ...state,
    columns: columns,
    tables: tables,
  };
  newState.sections.tables.tables = tableNames;

  return newState;
};

const setColumnAsXAxis = (state, action) => {
  /**Sets a column as the x-Axis. */

  let updatedTables = { ...state.tables };
  let updatedSections = { ...state.sections };

  // Remove the column from `state.tables.columns` if a the column came from
  // the tables.
  if (action.source === 'tables') {
    const updatedTableColumns = [
      ...state.tables[action.tableID].columns,
    ].filter((column) => column !== action.columnID);

    const updatedTable = updateObject(state.tables[action.tableID], {
      columns: updatedTableColumns,
    });

    updatedTables = updateObject(state.tables, {
      [action.tableID]: updatedTable,
    });
  }

  // Remove column from `state.sections.legends` if the column came from the
  // the legends.
  else if (action.source === 'legends') {
    const updatedColumns = [...updatedSections.legends.columns].filter(
      (column) => column !== action.columnID,
    );
    const updatedLegends = updateObject(updatedSections.legends, {
      columns: updatedColumns,
    });

    updatedSections = updateObject(updatedSections, {
      legends: updatedLegends,
    });
  }

  // If there is an x-axis column present, move it back to the tables.
  if (state.sections.xAxis.column.length) {
    const currXColumn = updatedSections.xAxis.column[0];
    const currXTableID = state.columns[currXColumn].table;
    const updatedTableColumns = [
      ...updatedTables[currXTableID].columns,
      currXColumn,
    ];
    const updatedTable = updateObject(updatedTables[currXTableID], {
      columns: updatedTableColumns,
    });
    updatedTables = updateObject(updatedTables, {
      [currXTableID]: updatedTable,
    });
  }

  // Update the x-axis.
  const updatedXAxis = updateObject(updatedSections.xAxis, {
    column: [action.columnID],
  });

  updatedSections = updateObject(updatedSections, { xAxis: updatedXAxis });

  return updateObject(state, {
    sections: updatedSections,
    tables: updatedTables,
  });
};

const moveColumnToLegends = (state, action) => {
  /**Moves a column to the legends section. */
  let updatedTables = { ...state.tables };
  let updatedSections = { ...state.sections };

  // Remove the column from `state.tables.columns` if a the column came from
  // the tables.
  if (action.source === 'tables') {
    const updatedTableColumns = [
      ...state.tables[action.tableID].columns,
    ].filter((column) => column !== action.columnID);

    const updatedTable = updateObject(state.tables[action.tableID], {
      columns: updatedTableColumns,
    });

    updatedTables = updateObject(state.tables, {
      [action.tableID]: updatedTable,
    });
  }

  // Remove column from `state.sections.xAxis.column` if the column came from
  // the x-axis section legends.
  else if (action.source === 'x-axis') {
    const updatedXAxis = updateObject(state.sections.xAxis, {
      column: [],
    });

    updatedSections = updateObject(updatedSections, {
      xAxis: updatedXAxis,
    });
  }

  // Add the column as a new legend.
  const updatedLegendsColumns = [...updatedSections.legends.columns];
  updatedLegendsColumns.splice(action.destinationIndex, 0, action.columnID);

  const updatedLegends = updateObject(updatedSections.legends, {
    columns: updatedLegendsColumns,
  });

  updatedSections = updateObject(updatedSections, { legends: updatedLegends });

  return updateObject(state, {
    sections: updatedSections,
    tables: updatedTables,
  });
};

const moveColumnToTables = (state, action) => {
  /**Moves a column back to its table. */

  let updatedSections = { ...state.sections };

  // Remove column from `state.sections.xAxis.column` if the column came from
  // the x-axis section legends.
  if (action.source === 'x-axis') {
    const updatedXAxis = updateObject(state.sections.xAxis, {
      column: [],
    });

    updatedSections = updateObject(updatedSections, {
      xAxis: updatedXAxis,
    });
  }

  // Remove column from `state.sections.legends` if the column came from the
  // the legends.
  else if (action.source === 'legends') {
    const updatedColumns = [...updatedSections.legends.columns].filter(
      (column) => column !== action.columnID,
    );
    const updatedLegends = updateObject(updatedSections.legends, {
      columns: updatedColumns,
    });

    updatedSections = updateObject(updatedSections, {
      legends: updatedLegends,
    });
  }

  // If the column has been dropped onto the correct table, then insert it at
  // the index in which it was dropped. Otherwise, append it to the end.
  const tableID = state.columns[action.columnID].table;

  const updatedTableColumns = [...state.tables[tableID].columns];
  if (tableID === action.destinationID) {
    updatedTableColumns.splice(action.destinationIndex, 0, action.columnID);
  } else {
    updatedTableColumns.push(action.columnID);
  }

  const updatedTable = updateObject(state.tables[tableID], {
    columns: updatedTableColumns,
  });

  const updatedTables = updateObject(state.tables, {
    [tableID]: updatedTable,
  });

  return updateObject(state, {
    tables: updatedTables,
    sections: updatedSections,
  });
};

const setColumnData = (state, action) => {
  /**Store data belonging toa column. */
  // Matches the keys structure in `state.columns`.
  const columnID = action.column + '__' + action.table;
  const updatedColumn = updateObject(state.columns[columnID], {
    data: action.data,
  });
  const updatedColumns = updateObject(state.columns, {
    [columnID]: updatedColumn,
  });
  return updateObject(state, { columns: updatedColumns });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TABLES_DATA:
      return setUserTablesData(state, action);
    case actionTypes.SET_COLUMN_AS_X_AXIS:
      return setColumnAsXAxis(state, action);
    case actionTypes.MOVE_COLUMN_TO_LEGENDS:
      return moveColumnToLegends(state, action);
    case actionTypes.MOVE_COLUMN_TO_TABLES:
      return moveColumnToTables(state, action);
    case actionTypes.SET_COLUMN_DATA:
      return setColumnData(state, action);
    default:
      return state;
  }
};

export default reducer;
