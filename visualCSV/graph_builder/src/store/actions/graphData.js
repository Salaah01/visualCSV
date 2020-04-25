/**Redux actions related to building the graph. The following actions will be
 * included:
 *  setUserTablesData: Action that will handle th user's table data retrieved.
 *  setColumnAsXAxis: Action to set a column as the x-axis.
 *  moveColumnToLegend: Action to move a column as the legends.
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
   *  tableID: (null|string) The tableID if the column is being moved from the
   *    tables section to the x-axis section.
   *  columnID: (string) The columnID of the source column.
   *  source: (string[tables|legend]) Where is the column being moved from?
   */
  return {
    type: actionTypes.SET_COLUMN_AS_X_AXIS,
    tableID: tableID,
    columnID: columnID,
    source: source,
  };
};

export const moveColumnToLegend = (tableID, columnID, source) => {
  /**Action to move a column as the legends.
   * Args:
   *  tableID: (null|string) The tableID if the column is being moved from the
   *    tables section to the x-axis section.
   *  columnID: (string) The columnID of the source column.
   *  source: (string[tables|legend]) Where is the column being moved from?
   */
  return {
    type: actionTypes.MOVE_COLUMN_TO_LEGEND,
    tableID: tableID,
    columnID: columnID,
    source: source,
  };
};
