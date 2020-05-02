/**Redux actions related to the graph options. The following actions will be
 * included:
 *  updateGraphType: Updates the graph type.
 *  updateYAxisStackOpt: Updates the stack option for a graph to true/false.
 *  toggleTitleDisplay: Toggles the title display option.
 *  updateDisplayText: Updates the display text.
 *  updateDisplayPosition: Updates the display position.
 *  updateDisplayFontSize: Updates the display font size.
 *  updateDisplayFontColour: Updates the font colour.
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

export const toggleTitleDisplay = () => {
  /**Toggles the title display option. */
  return {
    type: actionTypes.TOGGLE_TITLE_DISPLAY,
  };
};

export const updateDisplayText = (text) => {
  /**Updates the display text. */
  return {
    type: actionTypes.UPDATE_DISPLAY_TEXT,
    text: text,
  };
};

export const updateDisplayPosition = (position) => {
  /**Updates the display position. */
  return {
    type: actionTypes.UPDATE_DISPLAY_POSITION,
    position: position,
  };
};

export const updateDisplayFontSize = (size) => {
  /**Updates the display font size. */
  return {
    type: actionTypes.UPDATE_DISPLAY_FONT_SIZE,
    size: size,
  };
};

export const updateDisplayFontColour = colour => {
  /**Updates the font colour. */
  return {
    type: actionTypes.UPDATE_DISPLAY_FONT_COLOUR,
    colour: colour
  }
}