/**Redux reducer that is used for building the main graph. These include:
 *  setUserTablesData: Stores data on the user's tables once retrieved.
 *  setColumnAsXAxis: Sets a column as the x-Axis.
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

  const newState = { ...state };

  // From `state.tables.columns` remove the column.
  const tableCopy = { ...state.tables[action.tableID] };
  const updatedTableColumns = [...tableCopy.columns].filter(
    (column) => column !== action.columnID,
  );

  const updatedTable = updateObject(state.tables[action.tableID], {
    columns: updatedTableColumns,
  });

  const updatedTables = updateObject(state.tables, {
    [action.tableID]: updatedTable,
  });

  // Update the x-axis.
  const updatedXAxis = updateObject(state.sections.xAxis.column, {
    column: action.columnID,
  });

  const updatedSections = updateObject(state.sections, { xAxis: updatedXAxis });

  return updateObject(state, {
    sections: updatedSections,
    tables: updatedTables,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_TABLES_DATA:
      return setUserTablesData(state, action);
    case actionTypes.MOVE_COLUMN_TO_X_AXIS:
      return setColumnAsXAxis(state, action);
    default:
      return state;
  }
};

export default reducer;
