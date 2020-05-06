/**Redux reducer that is used for building the main graph. These include:
 *  setUserTablesData: Stores data on the user's tables once retrieved.
 *  setColumnAsXAxis: Sets a column as the x-Axis.
 *  moveColumnToLegends: Moves a column to the legends section.
 *  moveColumnToTables: Moves a column back to its table.
 *  setColumnData: Stores the data belonging to a column.
 *  unAggregate: Expands the data in the dataset, such that if they were aggregated before,
 *    they effectively will become un-aggregated.
 */

// IMPORTS
// Third Party Imports
import randomFlatColours from 'random-flat-colors';

// Local Imports
import { updateObject } from '../../../../core_functions/js';
import * as actionTypes from '../actions/actionTypes';
import { hexToRgb } from '../../../../core_functions/js';

const initialState = {
  columns: {},
  tables: {},
  sections: {
    xAxis: { id: 'xAxis', column: [] },
    legends: { id: 'legends', columns: [] },
    tables: { id: 'tables', tables: [] },
  },
  dataSets: {},
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

const _aggregate_legends = (xAxisData, legendData, method) => {
  /**Aggregates data.
   * Args:
   *  xAxisData: (arr) Array of data which make up the x-axis.
   *  legendData: (arr) Array of data to be aggregated.
   *  method: (str) Aggregation method.
   */

  // Set the x-axis and form an empty dictionary key/value relationship where
  // each value is an empty list.
  let aggData = {};
  const xAxisKeys = [...new Set(xAxisData)];
  for (const key of xAxisKeys) {
    aggData[key] = [];
  }

  // Bucket each piece of data in accordance with the x-axis.
  for (let x = 0; x < xAxisData.length; x++) {
    aggData[xAxisData[x]].push(legendData[x]);
  }

  // Aggregate
  switch (method) {
    case 'COUNT':
      for (const xAxisKey of xAxisKeys) {
        aggData[xAxisKey] = aggData[xAxisKey].length;
      }
      break;

    case 'SUM':
      for (const xAxisKey of xAxisKeys) {
        aggData[xAxisKey] = aggData[xAxisKey].reduce((a, b) => a + b, 0);
      }
      break;

    case 'AVERAGE':
      for (const xAxisKey of xAxisKeys) {
        aggData[xAxisKey] =
          aggData[xAxisKey].reduce((a, b) => a + b, 0) /
          aggData[xAxisKey].length;
      }
      break;

    default:
      throw Error('Aggregation method is not valid.');
  }

  // Convert the aggregated data to an ordered array.
  const results = [];
  for (const xAxisKey of xAxisKeys) {
    results.push(aggData[xAxisKey]);
  }

  return results;
};

const addDataSet = (state, action) => {
  /**Adds a new dataset. This is used primarily to build the graph. */
  let bgColour;
  let borderColour;

  if (action.bgColour) {
    bgColour = action.bgColour;
    borderColour = action.borderColour ? action.borderColour : bgColour;
  } else {
    const colour = hexToRgb(randomFlatColours());
    const colourPrefix = `rgba(${colour.r}, ${colour.g}, ${colour.b}`;
    bgColour = `${colourPrefix}, .6)`;
    borderColour = `${colourPrefix}, 1)`;

    bgColour = action.bgColour;
    borderColour = action.borderColour ? action.borderColour : borderColour;
  }

  const label = action.label
    ? action.label
    : state.columns[action.columnID].columnName;

  // How the data is built is dependant on the aggregation method as well as
  // the axis. By default, for every bit of data, there will be a separate
  // column. Through aggregation these will be merged.

  // If there is any aggregation, then the x-axis becomes the set of itself and
  // the y-axis is aggregated accordingly.
  let data;
  if (state.columns[action.columnID].data) {
    data = state.columns[action.columnID].data;
  } else {
    data = [];
  }

  if (action.aggregation) {
    if (action.axis === 'x') {
      data = [...new Set(data)];
    } else if (state.sections.xAxis.column.length) {
      const xAxisCol = state.sections.xAxis.column[0];
      const xAxisData = state.columns[xAxisCol].data;
      data = _aggregate_legends(xAxisData, data, action.aggregation);
    }
  }

  const updatedDataSet = updateObject(state.dataSets, {
    [action.columnID]: {
      label: label,
      data: data,
      backgroundColor: bgColour,
      borderColor: borderColour,
      borderWidth: action.borderWidth ? action.borderWidth : 1,
      index: Object.keys(state.dataSets).length,
    },
  });

  return updateObject(state, { dataSets: updatedDataSet });
};

const reAggregate = (state, action) => {
  /**Re-aggregates all the datasets. */

  if (!action.method) {
    return state;
  }

  // Aggregate the x-axis if possible. If there isn't a column set up as the
  // x-axis then return the state as it is.

  if (state.sections.xAxis.column.length) {
    const xAxisID = state.sections.xAxis.column[0];
    let xAxisSet = state.columns[xAxisID].data;
    xAxisSet = [...new Set(xAxisSet)];

    if (state.columns[xAxisID].data.length) {
      // Change the x-axis to it's set version.
      let updatedDataSet = { ...state.dataSets };
      const xAxisData = state.columns[xAxisID].data;

      const updatedXAxis = updateObject(updatedDataSet[xAxisID], {
        data: xAxisSet,
      });

      updatedDataSet = updateObject(updatedDataSet, {
        [xAxisID]: updatedXAxis,
      });

      // Update all legends
      const legendIDs = Object.keys(updatedDataSet).filter(
        (id) => id !== xAxisID,
      );

      for (const legendID of legendIDs) {
        const updatedLegendData = _aggregate_legends(
          xAxisData,
          state.columns[legendID].data,
          action.method,
        );

        const updatedLegend = updateObject(updatedDataSet[legendID], {
          data: updatedLegendData,
        });

        updatedDataSet = updateObject(updatedDataSet, {
          [legendID]: updatedLegend,
        });
      }

      // Update and return the state.
      return updateObject(state, { dataSets: updatedDataSet });
    } else {
      return state;
    }
  } else {
    return state;
  }
};

const unAggregate = (state) => {
  /**Expands the data in the dataset, such that if they were aggregated before,
   * they effectively will become un-aggregated.
   */

  let updatedDataSet = { ...state.dataSets };

  for (const columnID of Object.keys(updatedDataSet)) {
    const updatedColumn = updateObject(updatedDataSet[columnID], {
      data: state.columns[columnID].data,
    });
    updatedDataSet = updateObject(updatedDataSet, {
      [columnID]: updatedColumn,
    });
  }

  return updateObject(state, { dataSets: updatedDataSet });
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
    case actionTypes.ADD_DATA_SET:
      return addDataSet(state, action);
    case actionTypes.RE_AGGREGATE:
      return reAggregate(state, action);
    case actionTypes.UN_AGGREGATE:
      return unAggregate(state);
    default:
      return state;
  }
};

export default reducer;
