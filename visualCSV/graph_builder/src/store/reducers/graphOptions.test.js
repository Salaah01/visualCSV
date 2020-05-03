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

describe('TOGGLE_TITLE_DISPLAY', () => {
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
    type: actionTypes.TOGGLE_TITLE_DISPLAY,
  });

  it('should update the display to `false` for each graph type.', () => {
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

  it('should update the display to `true` for each graph type.', () => {
    const updatedReducer = graphOptionsReducer(reducer, {
      type: actionTypes.TOGGLE_TITLE_DISPLAY,
    });

    expect(updatedReducer.options).toEqual({
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

describe('UPDATE_DISPLAY_TEXT', () => {
  const state = {
    options: {
      bar: { title: { text: '' } },
      line: { title: { text: '' } },
      pie: { title: { text: '' } },
      doughnut: { title: { text: '' } },
      'horizontal bar': { title: { text: '' } },
      polar: { title: { text: '' } },
      radar: { title: { text: '' } },
      scatter: { title: { text: '' } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_DISPLAY_TEXT,
    text: 'abc',
  });

  it('should update the display text to `abc`.', () => {
    expect(reducer.options.bar.title.text).toEqual('abc');
    expect(reducer.options.line.title.text).toEqual('abc');
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.title.text).toEqual('');
    expect(state.options.bar.title.text).toEqual('');
  });
});

describe('UPDATE_DISPLAY_POSITION', () => {
  const state = {
    options: {
      bar: { title: { position: 'top' } },
      line: { title: { position: 'top' } },
      pie: { title: { position: 'top' } },
      doughnut: { title: { position: 'top' } },
      'horizontal bar': { title: { position: 'top' } },
      polar: { title: { position: 'top' } },
      radar: { title: { position: 'top' } },
      scatter: { title: { position: 'top' } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_DISPLAY_POSITION,
    position: 'bottom',
  });

  it('should update the display text to `bottom`.', () => {
    expect(reducer.options.bar.title.position).toEqual('bottom');
    expect(reducer.options.line.title.position).toEqual('bottom');
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.title.position).toEqual('top');
    expect(state.options.bar.title.position).toEqual('top');
  });
});

describe('UPDATE_DISPLAY_FONT_SIZE', () => {
  const state = {
    options: {
      bar: { title: { fontSize: 12 } },
      line: { title: { fontSize: 12 } },
      pie: { title: { fontSize: 12 } },
      doughnut: { title: { fontSize: 12 } },
      'horizontal bar': { title: { fontSize: 12 } },
      polar: { title: { fontSize: 12 } },
      radar: { title: { fontSize: 12 } },
      scatter: { title: { fontSize: 12 } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_DISPLAY_FONT_SIZE,
    size: 25,
  });

  it('should update the display title to `25`.', () => {
    expect(reducer.options.bar.title.fontSize).toEqual(25);
    expect(reducer.options.line.title.fontSize).toEqual(25);
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.title.fontSize).toEqual(12);
    expect(state.options.bar.title.fontSize).toEqual(12);
  });
});

describe('UPDATE_DISPLAY_FONT_COLOUR', () => {
  const state = {
    options: {
      bar: { title: { fontColor: '#fff' } },
      line: { title: { fontColor: '#fff' } },
      pie: { title: { fontColor: '#fff' } },
      doughnut: { title: { fontColor: '#fff' } },
      'horizontal bar': { title: { fontColor: '#fff' } },
      polar: { title: { fontColor: '#fff' } },
      radar: { title: { fontColor: '#fff' } },
      scatter: { title: { fontColor: '#fff' } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_DISPLAY_FONT_COLOUR,
    colour: 'blue',
  });

  it('should update the display font colour to `blue`.', () => {
    expect(reducer.options.bar.title.fontColor).toEqual('blue');
    expect(reducer.options.line.title.fontColor).toEqual('blue');
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.title.fontColor).toEqual('#fff');
    expect(state.options.bar.title.fontColor).toEqual('#fff');
  });
});

describe('TOGGLE_LEGEND_DISPLAY', () => {
  const state = {
    options: {
      bar: { legend: { display: true } },
      line: { legend: { display: true } },
      pie: { legend: { display: true } },
      doughnut: { legend: { display: true } },
      'horizontal bar': { legend: { display: true } },
      polar: { legend: { display: true } },
      radar: { legend: { display: true } },
      scatter: { legend: { display: true } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.TOGGLE_LEGEND_DISPLAY,
  });

  it('should update the display to `false` for each graph type.', () => {
    expect(reducer.options).toEqual({
      bar: { legend: { display: false } },
      line: { legend: { display: false } },
      pie: { legend: { display: false } },
      doughnut: { legend: { display: false } },
      'horizontal bar': { legend: { display: false } },
      polar: { legend: { display: false } },
      radar: { legend: { display: false } },
      scatter: { legend: { display: false } },
    });
  });

  it('should update the legend display to `true` for each graph type.', () => {
    const updatedReducer = graphOptionsReducer(reducer, {
      type: actionTypes.TOGGLE_LEGEND_DISPLAY,
    });

    expect(updatedReducer.options).toEqual({
      bar: { legend: { display: true } },
      line: { legend: { display: true } },
      pie: { legend: { display: true } },
      doughnut: { legend: { display: true } },
      'horizontal bar': { legend: { display: true } },
      polar: { legend: { display: true } },
      radar: { legend: { display: true } },
      scatter: { legend: { display: true } },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options).toEqual({
      bar: { legend: { display: true } },
      line: { legend: { display: true } },
      pie: { legend: { display: true } },
      doughnut: { legend: { display: true } },
      'horizontal bar': { legend: { display: true } },
      polar: { legend: { display: true } },
      radar: { legend: { display: true } },
      scatter: { legend: { display: true } },
    });
  });
});

describe('UPDATE_LEGEND_POSITION', () => {
  const state = {
    options: {
      bar: { legend: { position: 'top' } },
      line: { legend: { position: 'top' } },
      pie: { legend: { position: 'top' } },
      doughnut: { legend: { position: 'top' } },
      'horizontal bar': { legend: { position: 'top' } },
      polar: { legend: { position: 'top' } },
      radar: { legend: { position: 'top' } },
      scatter: { legend: { position: 'top' } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_LEGEND_POSITION,
    position: 'bottom',
  });

  it('should update the legend position to `bottom`.', () => {
    expect(reducer.options.bar.legend.position).toEqual('bottom');
    expect(reducer.options.line.legend.position).toEqual('bottom');
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.legend.position).toEqual('top');
    expect(state.options.bar.legend.position).toEqual('top');
  });
});

describe('UPDATE_LEGEND_ALIGNMENT', () => {
  const state = {
    options: {
      bar: { legend: { align: 'top' } },
      line: { legend: { align: 'top' } },
      pie: { legend: { align: 'top' } },
      doughnut: { legend: { align: 'top' } },
      'horizontal bar': { legend: { align: 'top' } },
      polar: { legend: { align: 'top' } },
      radar: { legend: { align: 'top' } },
      scatter: { legend: { align: 'top' } },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_LEGEND_ALIGNMENT,
    alignment: 'bottom',
  });

  it('should update the legend alignment to `bottom`.', () => {
    expect(reducer.options.bar.legend.align).toEqual('bottom');
    expect(reducer.options.line.legend.align).toEqual('bottom');
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.legend.align).toEqual('top');
    expect(state.options.bar.legend.align).toEqual('top');
  });
});
