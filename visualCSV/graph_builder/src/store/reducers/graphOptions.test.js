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
      line: { scales: { yAxes: [{ stacked: false }] } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_Y_AXIS_STACK_OPT,
    opt: true,
    graphType: 'line',
  });

  it('should update the y-axis stack for the line graph to true.', () => {
    expect(reducer.options.line.scales.yAxes).toEqual([{ stacked: true }]);
  });

  it('should update the y-axis stack for the line graph to false.', () => {
    const state = {
      options: {
        line: { scales: { yAxes: [{ stacked: true }] } },
      },
    };

    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_Y_AXIS_STACK_OPT,
      opt: false,
      graphType: 'line',
    });

    expect(reducer.options.line.scales.yAxes).toEqual([{ stacked: false }]);
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      options: {
        line: { scales: { yAxes: [{ stacked: false }] } },
      },
    });
  });
});

describe('SET_TITLE_DISPLAY_TRUE', () => {
  const state = {
    options: {
      bar: { title: { display: false } },
      line: { title: { display: false } },
      pie: { title: { display: false } },
      doughnut: { title: { display: false } },
      'horizontal bar': { title: { display: false } },
      polar: { title: { display: false } },
      radar: { title: { display: false } },
      scatter: { title: { display: false } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.SET_TITLE_DISPLAY_TRUE,
  });

  it('should update the display to true for each graph type.', () => {
    expect(reducer.options).toEqual({
      bar: { title: { display: true } },
      line: { title: { display: true } },
      pie: { title: { display: true } },
      doughnut: { title: { display: true } },
      'horizontal bar': { title: { display: true } },
      polar: { title: { display: true } },
      radar: { title: { display: true } },
      scatter: { title: { display: true } },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options).toEqual({
      bar: { title: { display: false } },
      line: { title: { display: false } },
      pie: { title: { display: false } },
      doughnut: { title: { display: false } },
      'horizontal bar': { title: { display: false } },
      polar: { title: { display: false } },
      radar: { title: { display: false } },
      scatter: { title: { display: false } },
    });
  });
});

describe('SET_TITLE_DISPLAY_FALSE', () => {
  const state = {
    options: {
      bar: { title: { display: true } },
      line: { title: { display: true } },
      pie: { title: { display: true } },
      doughnut: { title: { display: true } },
      'horizontal bar': { title: { display: true } },
      polar: { title: { display: true } },
      radar: { title: { display: true } },
      scatter: { title: { display: true } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.SET_TITLE_DISPLAY_FALSE,
  });

  it('should update the display to true for each graph type.', () => {
    expect(reducer.options).toEqual({
      bar: { title: { display: false } },
      line: { title: { display: false } },
      pie: { title: { display: false } },
      doughnut: { title: { display: false } },
      'horizontal bar': { title: { display: false } },
      polar: { title: { display: false } },
      radar: { title: { display: false } },
      scatter: { title: { display: false } },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options).toEqual({
      bar: { title: { display: true } },
      line: { title: { display: true } },
      pie: { title: { display: true } },
      doughnut: { title: { display: true } },
      'horizontal bar': { title: { display: true } },
      polar: { title: { display: true } },
      radar: { title: { display: true } },
      scatter: { title: { display: true } },
    });
  });
});
