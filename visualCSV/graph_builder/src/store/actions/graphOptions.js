/**Redux actions related to the graph options. The following actions will be
 * included:
 *  updateGraphType: Updates the graph type.
 */

import * as actionTypes from './actionTypes';

export const updateGraphType = (graphType) => {
  /**Updates the graph type.
   * Args:
   *  graphType: (str) Graph type.
   */
  return {
    type: actionTypes.UPDATE_GRAPH_TYPE,
    graphType: graphType,
  };
};
