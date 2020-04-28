/**Unit tests for the graphOptions reducer */

// IMPORTS
// Third Party Imports

// Local Imports
import graphOptionsReducer from './graphOptions';
import * as actionTypes from '../actions/actionTypes';

describe('UPDATE_GRAPH_TYPE', () => {
  const state = { graphType: 'line' };
  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_GRAPH_TYPE,
    graphType: 'pie',
  });

  it("should update `graphType` to 'pie'.", () => {
    expect(reducer.graphType).toEqual('pie');
  });

  it('should not mutate the original state.', () => {
    expect(state.graphType).toEqual('line');
  });
});

describe('UPDATE_Y_AXIS_STACK_OPT', () => {
  const state = {
    options: {
      line: { scales: { yAxis: [{ stacked: false }] } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_Y_AXIS_STACK_OPT,
    opt: true,
    graphType: 'line',
  });

  it('should update the y-axis stack for the line graph to true.', () => {
    expect(reducer.options.line.scales.yAxis).toEqual([{ stacked: true }]);
  });

  it('should update the y-axis stack for the line graph to false.', () => {
    const state = {
      options: {
        line: { scales: { yAxis: [{ stacked: true }] } },
      },
    };

    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_Y_AXIS_STACK_OPT,
      opt: false,
      graphType: 'line',
    });

    expect(reducer.options.line.scales.yAxis).toEqual([{ stacked: false }]);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      options: {
        line: { scales: { yAxis: [{ stacked: false }] } },
      },
    });
  });
});
