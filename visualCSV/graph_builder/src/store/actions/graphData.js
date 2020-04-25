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

export const setColumnAsXAxis = (tableID, columnID) => {
  /**Action to set a column as the x-axis. */
  return {
    type: actionTypes.MOVE_COLUMN_TO_X_AXIS,
    tableID: tableID,
    columnID: columnID,
  };
};

export const moveColumnToLegend = (tableID, columnID) => {
  /**Action to move a column as the legends. */
  return {
    type: actionTypes.MOVE_COLUMN_TO_LEGEND,
    tableID: tableID,
    columnID: columnID,
  };
};
