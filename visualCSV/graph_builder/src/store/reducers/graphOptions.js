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
    yAxes: [{ ticks: { beginAtZero: true } }],
    xAxes: [{ ticks: { beginAtZero: true } }],
  },
  title: {
    display: true,
    text: '',
    position: 'top',
    fontSize: 12,
    fontColor: '#616161',
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
  return updateGraphTitleProps(state, 'fontColor', action.colour)
}

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
      return updateDisplayFontColour(state, action)
    default:
      return state;
  }
};

export default reducer;
