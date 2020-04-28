/**Redux actions related to the graph options. The following actions will be
 * included:
 *  updateGraphType: Updates the graph type.
 *  updateYAxisStackOpt: Updates the stack option for a graph to true/false.
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

export const updateYAxisStackOpt = (opt, graphType) => {
  /**Updates the stack option for a graph to true/false.
   * Args:
   *  opt: (bool) Option to set the stack property to true or false.
   *  graphType: (str) Name of the graph.
  */
  return {
    type: actionTypes.UPDATE_Y_AXIS_STACK_OPT,
    opt: opt,
    graphType: graphType,
  };
};
