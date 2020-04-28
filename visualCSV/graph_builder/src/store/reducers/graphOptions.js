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
 */

// IMPORTS
// Third Party Imports
import randomFlatColours from 'random-flat-colors';
import merge from 'deepmerge';

// Local Imports
import { updateObject } from '../../../../core_functions/js';
import * as actionTypes from '../actions/actionTypes';

const sharedOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{ ticks: { beginAtZero: true } }],
    xAxis: [{ ticks: { beginAtZero: true } }],
  },
};

const bar = merge(sharedOptions, {});
const pie = merge(sharedOptions, {});
const doughnut = merge(sharedOptions, {});
const horizontalBar = merge(sharedOptions, {});

const line = merge(sharedOptions, {
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRAPH_TYPE:
      return updateGraphType(state, action);
    default:
      return state;
  }
};

export default reducer;
