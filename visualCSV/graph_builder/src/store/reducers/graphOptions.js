/**Redux reducer that is used set the graph options.
 * The state will shared options as well a graph specific options.
 * This will enable the user to retain their options when they change the graph
 * type and then switch back.
 *
 * There needs to be an entry for each type of graph as defined in the `Graphs`
 * as the `GraphsOptions` container will use use each of the graph types as the
 * key to retrieve the respective state.
 *
 * The following reducers are included in the module:
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
 *  toggleAxisGridDisplay: Toggles the grid display for a given axis.
 *  updateAxisGridLineWidth: Updates the axis grid line width.
 *  updateAxisGridLineColour: Updates the axis grid line colour.
 *  updateAxisGrid0LineWidth: Updates the axis grid line width at 0.
 *  updateAxisGrid0LineColour: Updates the axis grid line colour at 0.
 *  updateAggregationMethod: Updates the aggregation method.
 */

// IMPORTS
// Third Party Imports
import merge from 'deepmerge';

// Local Imports
import { updateObject } from '../../../../core_functions/js';
import * as actionTypes from '../actions/actionTypes';

const sharedOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: { beginAtZero: true },
        scaleLabel: {
          display: false,
          labelString: '',
          fontColor: '#000',
          fontSize: 12,
        },
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
          zeroLineWidth: 1,
          zeroLineColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    ],
    xAxes: [
      {
        ticks: { beginAtZero: true },
        scaleLabel: {
          display: false,
          labelString: '',
          fontColor: '#000',
          fontSize: 12,
        },
        gridLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
          zeroLineWidth: 1,
          zeroLineColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    ],
  },
  title: {
    display: true,
    text: '',
    position: 'top',
    fontSize: 12,
    fontColor: '#616161',
  },
  legend: {
    display: true,
    position: 'top',
    align: 'center',
  },
};

const bar = merge(sharedOptions, {});
const pie = merge(sharedOptions, {});
const doughnut = merge(sharedOptions, {});
const horizontalBar = merge(sharedOptions, {});

const line = merge(sharedOptions, {
  fill: false,
  scales: {
    yAxes: [{ stacked: false }],
  },
});

const polar = merge(sharedOptions, {});
const radar = merge(sharedOptions, {});
const scatter = merge(sharedOptions, {});

const initialState = {
  graphType: 'bar',
  showingOptions: false,
  aggregation: 'AVERAGE',
  options: {
    bar: bar,
    pie: pie,
    doughnut: doughnut,
    'horizontal bar': horizontalBar,
    line: line,
    polar: polar,
    radar: radar,
    scatter: scatter,
  },
};

const graphTypes = Object.keys(initialState.options);

const updateGraphType = (state, action) => {
  /**Updates the graph type. */
  return updateObject(state, { graphType: action.graphType.toLowerCase() });
};

const updateYAxisStackOpt = (state, action) => {
  /**Updates the stack option for a graph to true/false.
   * Args:
   *  action.opt: (bool) Option to set the stack property to true or false.
   *  action.graphType: (str) Name of the graph.
   */

  const yAxes = [...state.options[action.graphType].scales.yAxes].map(
    (option) => {
      if (option.stacked === undefined) {
        return option;
      } else {
        return { stacked: action.opt };
      }
    },
  );

  const updatedScales = updateObject(state.options[action.graphType].scales, {
    yAxes: yAxes,
  });

  const updatedLine = updateObject(state.options[action.graphType], {
    scales: updatedScales,
  });

  const updatedOptions = updateObject(state.options, {
    [action.graphType]: updatedLine,
  });

  return updateObject(state, { options: updatedOptions });
};

const updateGraphTitleProps = (state, propName, propValue) => {
  /**Updates the display property for each graph with by updating the title
   * object with a new value for a particular property.
   * Args:
   *  state: Current state.
   *  propName: Name of property (object key) to update.
   *  propValue: new value to assign to the property being updated.
   */
  const graphTypes = Object.keys(initialState.options);
  let graphOptions = { ...state.options };

  for (const graphType of graphTypes) {
    const updatedTitle = updateObject(graphOptions[graphType].title, {
      [propName]: propValue,
    });

    const updatedGraph = updateObject(graphOptions[graphType], {
      title: updatedTitle,
    });

    graphOptions = updateObject(graphOptions, { [graphType]: updatedGraph });
  }
  return updateObject(state, { options: graphOptions });
};

const updateGraphLegendsProps = (state, propName, propValue) => {
  /**Updates the display property for each graph with by updating the legends
   * object with a new value for a particular property.
   * Args:
   *  state: Current state.
   *  propName: Name of property (object key) to update.
   *  propValue: new value to assign to the property being updated.
   */
  let graphOptions = { ...state.options };

  for (const graphType of graphTypes) {
    const updatedLegend = updateObject(graphOptions[graphType].legend, {
      [propName]: propValue,
    });

    const updatedGraph = updateObject(graphOptions[graphType], {
      legend: updatedLegend,
    });

    graphOptions = updateObject(graphOptions, { [graphType]: updatedGraph });
  }

  return updateObject(state, { options: graphOptions });
};

const toggleTitleDisplay = (state) => {
  /**Toggles the title display option. */
  return updateGraphTitleProps(
    state,
    'display',
    !state.options.bar.title.display,
  );
};

const updateDisplayText = (state, action) => {
  /**Updates the display text. */
  return updateGraphTitleProps(state, 'text', action.text);
};

const updateDisplayPosition = (state, action) => {
  /**Updates the display position. */
  return updateGraphTitleProps(state, 'position', action.position);
};

const updateDisplayFontSize = (state, action) => {
  /**Updates the display font size. */
  return updateGraphTitleProps(state, 'fontSize', action.size);
};

const updateDisplayFontColour = (state, action) => {
  /**Updates the font colour. */
  return updateGraphTitleProps(state, 'fontColor', action.colour);
};

const toggleLegendDisplay = (state) => {
  /**Toggles the legend display option. */
  return updateGraphLegendsProps(
    state,
    'display',
    !state.options.bar.legend.display,
  );
};

const updateLegendPosition = (state, action) => {
  /**Updates the legend position. */
  return updateGraphLegendsProps(state, 'position', action.position);
};

const updateLegendAlignment = (state, action) => {
  /**Updates the legend alignment. */
  return updateGraphLegendsProps(state, 'align', action.alignment);
};

const updateAxisScaleLabel = (state, axis, propName, propValue) => {
  /**Updates the `scaleLabel` property for a given axis.
   * Args:
   *  state: (obj) State object.
   *  axis: (str) `x` or `y` to indicate x-axis and y-axis respectively. This
   *    is the axis in which the changes will be applied.
   *  propName: (str) The name of the property to update.
   *  propValue: (any) The value of the updated property.
   */
  let graphOptions = { ...state.options };
  for (const graphType of graphTypes) {
    const updatedAxis = [...graphOptions[graphType].scales[axis]].map(
      (option) => {
        if (option.scaleLabel === undefined) {
          return option;
        } else {
          const updatedScaleLabel = updateObject(option.scaleLabel, {
            [propName]: propValue,
          });
          return updateObject(option, { scaleLabel: updatedScaleLabel });
        }
      },
    );

    const updatedScales = updateObject(graphOptions[graphType].scales, {
      [axis]: updatedAxis,
    });

    const updatedGraph = updateObject(graphOptions[graphType], {
      scales: updatedScales,
    });

    graphOptions = updateObject(graphOptions, {
      [graphType]: updatedGraph,
    });
  }

  return updateObject(state, { options: graphOptions });
};

const toggleAxisLabelDisplay = (state, action) => {
  /**Toggles the display option the defined axis. */
  return updateAxisScaleLabel(
    state,
    action.axis,
    'display',
    !action.currDisplay,
  );
};

const updateAxisLabel = (state, action) => {
  /**Updates the label for a given axis. */
  return updateAxisScaleLabel(state, action.axis, 'labelString', action.label);
};

const updateAxisFontColour = (state, action) => {
  /**Update the font colour for a given axis. */
  return updateAxisScaleLabel(state, action.axis, 'fontColor', action.colour);
};

const updateAxisFontSize = (state, action) => {
  /**Update the font size for a given axis. */
  return updateAxisScaleLabel(state, action.axis, 'fontSize', action.size);
};

const updateAxisGridOptions = (state, axis, propName, propValue) => {
  /**Updates the `gridLines` property for a given `axis`.
   * Args:
   *  state: (obj) State object.
   *  axis: (str) `x` or `y` to indicate x-axis and y-axis respectively. This
   *    is the axis in which the changes will be applied.
   *  propName: (str) The name of the property to update.
   *  propValue: (any) The value of the updated property.
   */

  let graphOptions = { ...state.options };
  for (const graphType of graphTypes) {
    const updatedAxis = [...graphOptions[graphType].scales[axis]].map(
      (option) => {
        if (option.gridLines === undefined) {
          return option;
        } else {
          const updatedGridLines = updateObject(option.gridLines, {
            [propName]: propValue,
          });
          return updateObject(option, { gridLines: updatedGridLines });
        }
      },
    );

    const updatedScales = updateObject(graphOptions[graphType].scales, {
      [axis]: updatedAxis,
    });

    const updatedGraph = updateObject(graphOptions[graphType], {
      scales: updatedScales,
    });

    graphOptions = updateObject(graphOptions, {
      [graphType]: updatedGraph,
    });
  }

  return updateObject(state, { options: graphOptions });
};

const toggleAxisGridDisplay = (state, action) => {
  /**Toggles the grid display for a given axis.
   * Args:
   *  axis: (str) Axis to which the changes should be applied.
   */
  return updateAxisGridOptions(
    state,
    action.axis,
    'display',
    !state.options.bar.scales[action.axis][0].gridLines.display,
  );
};

const updateAxisGridLineWidth = (state, action) => {
  /**Updates the axis grid line width.
   * Args:
   *  axis: (str) Axis to which the changes should be applied.
   *  width: (int) Line width in px.
   */
  return updateAxisGridOptions(state, action.axis, 'lineWidth', action.width);
};

const updateAxisGridLineColour = (state, action) => {
  /**Updates the axis grid line colour.
   * Args:
   *  axis: (str) Axis to which the changes should be applied.
   *  colour: (str) Line colour in the rgba, rgb or hex format.
   */
  return updateAxisGridOptions(state, action.axis, 'color', action.colour);
};

const updateAxisGrid0LineWidth = (state, action) => {
  /**Updates the axis grid line width at 0.
   * Args:
   *  axis: (str) Axis to which the changes should be applied.
   *  width: (int) Line width in px.
   */
  return updateAxisGridOptions(
    state,
    action.axis,
    'zeroLineWidth',
    action.width,
  );
};

const updateAxisGrid0LineColour = (state, action) => {
  /**Updates the axis grid line colour at 0.
   * Args:
   *  axis: (str) Axis to which the changes should be applied.
   *  colour: (str) Line colour in the rgba, rgb or hex format.
   */
  return updateAxisGridOptions(
    state,
    action.axis,
    'zeroLineColor',
    action.colour,
  );
};

const updateAggregationMethod = (state, action) => {
  /**Updates the aggregation method.
   * Args:
   *  method: (str) New aggregation method.
   */
  return updateObject(state, { aggregation: action.method });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRAPH_TYPE:
      return updateGraphType(state, action);
    case actionTypes.UPDATE_Y_AXIS_STACK_OPT:
      return updateYAxisStackOpt(state, action);
    case actionTypes.TOGGLE_TITLE_DISPLAY:
      return toggleTitleDisplay(state);
    case actionTypes.UPDATE_DISPLAY_TEXT:
      return updateDisplayText(state, action);
    case actionTypes.UPDATE_DISPLAY_POSITION:
      return updateDisplayPosition(state, action);
    case actionTypes.UPDATE_DISPLAY_FONT_SIZE:
      return updateDisplayFontSize(state, action);
    case actionTypes.UPDATE_DISPLAY_FONT_COLOUR:
      return updateDisplayFontColour(state, action);
    case actionTypes.TOGGLE_LEGEND_DISPLAY:
      return toggleLegendDisplay(state);
    case actionTypes.UPDATE_LEGEND_POSITION:
      return updateLegendPosition(state, action);
    case actionTypes.UPDATE_LEGEND_ALIGNMENT:
      return updateLegendAlignment(state, action);
    case actionTypes.TOGGLE_AXIS_LABEL_DISPLAY:
      return toggleAxisLabelDisplay(state, action);
    case actionTypes.UPDATE_AXIS_LABEL:
      return updateAxisLabel(state, action);
    case actionTypes.UPDATE_AXIS_FONT_COLOUR:
      return updateAxisFontColour(state, action);
    case actionTypes.UPDATE_AXIS_FONT_SIZE:
      return updateAxisFontSize(state, action);
    case actionTypes.TOGGLE_AXIS_GRID_DISPLAY:
      return toggleAxisGridDisplay(state, action);
    case actionTypes.UPDATE_AXIS_GRID_LINE_WIDTH:
      return updateAxisGridLineWidth(state, action);
    case actionTypes.UPDATE_AXIS_GRID_LINE_COLOUR:
      return updateAxisGridLineColour(state, action);
    case actionTypes.UPDATE_AXIS_GRID_0_LINE_WIDTH:
      return updateAxisGrid0LineWidth(state, action);
    case actionTypes.UPDATE_AXIS_GRID_0_LINE_COLOUR:
      return updateAxisGrid0LineColour(state, action);
    case actionTypes.UPDATE_AGGREGATION_METHOD:
      return updateAggregationMethod(state, action);
    default:
      return state;
  }
};

export default reducer;
