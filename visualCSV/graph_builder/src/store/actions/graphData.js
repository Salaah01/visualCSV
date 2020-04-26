/**Redux actions related to building the graph. The following actions will be
 * included:
 *  setUserTablesData: Action that will handle th user's table data retrieved.
 *  setColumnAsXAxis: Action to set a column as the x-axis.
 *  moveColumnToLegends: Action to move a column as the legends.
 *  moveColumnToTables: Action to move a column back to its table.
 *  setColumnData: Dispatches an action to store `data` belonging to a `column`
 *    from a `table` to the store.
 *  addDataSet: Action to add a new dataset.
 *  removeDataSet: Action to remove a dataset.
 */

import * as actionTypes from './actionTypes';

export const setUserTablesData = (data) => {
  /**Action that will handle th user's table data retrieved. */
  return {
    type: actionTypes.SET_USER_TABLES_DATA,
    data: data,
  };
};

export const setColumnAsXAxis = (tableID, columnID, source) => {
  /**Action to set a column as the x-axis.
   * Args:
   *  tableID: (null|str) The tableID if the column is being moved from the
   *    tables section to the x-axis section.
   *  columnID: (str) The columnID of the source column.
   *  source: (str[tables|legend]) Where is the column being moved from?
   */
  return {
    type: actionTypes.SET_COLUMN_AS_X_AXIS,
    tableID: tableID,
    columnID: columnID,
    source: source,
  };
};

export const moveColumnToLegends = (
  tableID,
  columnID,
  source,
  destinationIndex,
) => {
  /**Action to move a column as the legends.
   * Args:
   *  tableID: (null|str) The tableID if the column is being moved.
   *  columnID: (str) The columnID of the source column.
   *  source: (str[tables|legend]) Where is the column being moved from?
   *  destinationIndex: (int) Index at which the element has been dropped.
   */
  return {
    type: actionTypes.MOVE_COLUMN_TO_LEGENDS,
    tableID: tableID,
    columnID: columnID,
    source: source,
    destinationIndex: destinationIndex,
  };
};

export const moveColumnToTables = (
  columnID,
  source,
  destinationID,
  destinationIndex,
) => {
  /**Action to move a column back to its table.
   * Args:
   *  columnID: (str) The columnID of the source column.
   *  source: (str[tables|legend]) Where is the column being moved from?
   *  destinationID: (str) The destination ID.
   *  destinationIndex: (int) Index at which the element has been dropped.
   */
  return {
    type: actionTypes.MOVE_COLUMN_TO_TABLES,
    columnID: columnID,
    source: source,
    destinationID: destinationID,
    destinationIndex: destinationIndex,
  };
};

export const setColumnData = (table, column, data) => {
  /**Dispatches an action to store `data` belonging to a `column` from a
   * `table` to the store.
   * Args:
   *  table: (str) Name of the table.
   *  column: (str) Name of the column.
   *  data: (array) Data to be stored.
   */
  return {
    type: actionTypes.SET_COLUMN_DATA,
    table: table,
    column: column,
    data: data,
  };
};

export const addDataSet = (
  /**Adds a new dataset.
   * Args:
   *  columnID: (str) Column ID.
   *  label: (str) Dataset label.
   *  bgColour: (str) Background colour.
   *  borderColour: (str) Line colour.
   *  borderWidth: (int) Border width (px).
   */
  columnID,
  label = null,
  bgColour = null,
  borderColour = null,
  borderWidth = 1,
) => {
  return {
    type: actionTypes.ADD_DATA_SET,
    columnID: columnID,
    label: label,
    bgColour: bgColour,
    borderColour: borderColour,
    borderWidth: borderWidth,
  };
};
