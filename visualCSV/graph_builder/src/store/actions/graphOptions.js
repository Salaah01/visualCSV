/**Redux actions related to the graph options. The following actions will be
 * included:
 *  updateGraphType: Updates the graph type.
 *  updateYAxisStackOpt: Updates the stack option for a graph to true/false.
 *  toggleTitleDisplay: Toggles the title display option.
 *  updateDisplayText: Updates the display text.
 *  updateDisplayPosition: Updates the display position.
 *  updateDisplayFontSize: Updates the display font size.
 *  updateDisplayFontColour: Updates the font colour.
 *  toggleLegendDisplay: Toggles the legend display option.
 *  updateLegendPosition: Updates the legend position.
 *  updateLegendAlignment: Updates the legend alignment.
 *  toggleAxisLabelDisplay: Toggles the display option the defined axis.
 *  updateAxisLabel: Updates the label for a given axis.
 *  updateAxisFontColour: Update the font colour for a given axis.
 *  updateAxisFontSize: Update the font size for a given axis.
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

export const updateDisplayFontColour = (colour) => {
  /**Updates the font colour. */
  return {
    type: actionTypes.UPDATE_DISPLAY_FONT_COLOUR,
    colour: colour,
  };
};

export const toggleLegendDisplay = () => {
  /**Toggles the legend display option. */
  return {
    type: actionTypes.TOGGLE_LEGEND_DISPLAY,
  };
};

export const updateLegendPosition = (position) => {
  /**Updates the legend position.
   * Args:
   *  position: (str) New position.
   */
  return {
    type: actionTypes.UPDATE_LEGEND_POSITION,
    position: position,
  };
};

export const updateLegendAlignment = (alignment) => {
  /**Updates the legend alignment.
   * Args:
   *  alignment: (str) New alignment.
   */
  return {
    type: actionTypes.UPDATE_LEGEND_ALIGNMENT,
    alignment: alignment,
  };
};

export const toggleAxisLabelDisplay = (axis) => {
  /**Toggles the display option the defined axis.
   * Args:
   *  axis: (str) Axis in which to apply the changes.
   */
  return {
    type: actionTypes.TOGGLE_AXIS_LABEL_DISPLAY,
    axis: axis,
  };
};

export const updateAxisLabel = (axis, label) => {
  /**Updates the label for a given axis.
   * Args:
   *  axis: (str) Axis in which to apply the changes.
   *  label: (str) Axis label.
   */
  return {
    type: actionTypes.UPDATE_AXIS_LABEL,
    axis: axis,
    label: label,
  };
};

export const updateAxisFontColour = (axis, colour) => {
  /**Updates the font colour for a given axis.
   * Args:
   *  axis: (str) Axis in which to apply the changes.
   *  colour: (str) colour in either hex, rgb or rgba format.
   */
  return {
    type: actionTypes.UPDATE_AXIS_FONT_COLOUR,
    axis: axis,
    colour: colour,
  };
};

export const updateAxisFontSize = (axis, size) => {
  /**Updates the font size for a given axis.
   * Args:
   *  axis: (str) Axis in which to apply the changes.
   *  size: (int) Font size in px.
   */
  return {
    type: actionTypes.UPDATE_AXIS_FONT_SIZE,
    axis: axis,
    size: size,
  };
};
