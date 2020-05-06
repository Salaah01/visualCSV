/**Unit tests for the graphOptions reducer */

// IMPORTS
// Third Party Imports

// Local Imports
import graphOptionsReducer from './graphOptions';
import * as actionTypes from '../actions/actionTypes';
import reducer from './graphOptions';

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

describe('TOGGLE_AXIS_LABEL_DISPLAY', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.TOGGLE_AXIS_LABEL_DISPLAY,
    axis: 'yAxes',
    currDisplay: false,
  });

  it('should set the display for all y-axis to true.', () => {
    expect(reducer.options.polar.scales.yAxes[0].scaleLabel.display).toEqual(
      true,
    );
    expect(reducer.options.line.scales.yAxes[0].scaleLabel.display).toEqual(
      true,
    );
  });

  it('should not mutate the original state.', () => {
    expect(state.options.polar.scales.yAxes[0].scaleLabel.display).toEqual(
      false,
    );
    expect(state.options.line.scales.yAxes[0].scaleLabel.display).toEqual(
      false,
    );
  });
});

describe('UPDATE_AXIS_LABEL', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: '' } }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_LABEL,
    axis: 'xAxes',
    label: 'abc',
  });

  it('should update hte label for the xAxes.', () => {
    expect(reducer.options).toEqual({
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, labelString: '' } }],
          xAxes: [{ scaleLabel: { display: false, labelString: 'abc' } }],
        },
      },
    });
  });

  it('should not mutate the original state', () => {
    expect(state.options.polar.scales.yAxes[0].scaleLabel).toEqual({
      display: false,
      labelString: '',
    });
    expect(state.options.line.scales.yAxes[0].scaleLabel).toEqual({
      display: false,
      labelString: '',
    });
  });
});

describe('UPDATE_AXIS_FONT_COLOUR', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_FONT_COLOUR,
    axis: 'yAxes',
    colour: 'blue',
  });

  it('should change the colour for all `yAxes` labels only to blue.', () => {
    expect(reducer.options).toEqual({
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontColor: 'blue' } }],
          xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
        },
      },
    });
  });

  it('should not mutate to original state.', () => {
    expect(state).toEqual({
      options: {
        bar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        line: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        pie: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        doughnut: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        'horizontal bar': {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        polar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        radar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
        scatter: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
            xAxes: [{ scaleLabel: { display: false, fontColor: '#fff' } }],
          },
        },
      },
    });
  });
});

describe('UPDATE_AXIS_FONT_SIZE', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_FONT_SIZE,
    axis: 'xAxes',
    size: 25,
  });

  it('the font size for the x-axis label should update only.', () => {
    expect(reducer.options).toEqual({
      bar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      line: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          xAxes: [{ scaleLabel: { display: false, fontSize: 25 } }],
        },
      },
    });
  });

  it('should not mutate the original state.', () => {
    expect(state).toEqual({
      options: {
        bar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        line: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        pie: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        doughnut: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        'horizontal bar': {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        polar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        radar: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
        scatter: {
          scales: {
            yAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
            xAxes: [{ scaleLabel: { display: false, fontSize: 12 } }],
          },
        },
      },
    });
  });
});

describe('TOGGLE_AXIS_GRID_DISPLAY', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      line: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ gridLines: { display: false }, abc: true }],
          xAxes: [{ gridLines: { display: false }, abc: true }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.TOGGLE_AXIS_GRID_DISPLAY,
    axis: 'yAxes',
  });

  it('should update the display for the y-axis to true.', () => {
    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: true }, abc: true }],
      xAxes: [{ gridLines: { display: false }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: true }, abc: true }],
      xAxes: [{ gridLines: { display: false }, abc: true }],
    });
  });

  it('should update the display for the x-axis to true.', () => {
    const reducer = graphOptionsReducer(state, {
      type: actionTypes.TOGGLE_AXIS_GRID_DISPLAY,
      axis: 'xAxes',
    });

    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false }, abc: true }],
      xAxes: [{ gridLines: { display: true }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false }, abc: true }],
      xAxes: [{ gridLines: { display: true }, abc: true }],
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false }, abc: true }],
      xAxes: [{ gridLines: { display: false }, abc: true }],
    });

    expect(state.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false }, abc: true }],
      xAxes: [{ gridLines: { display: false }, abc: true }],
    });
  });
});

describe('UPDATE_AXIS_GRID_LINE_WIDTH', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      line: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
          xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_GRID_LINE_WIDTH,
    axis: 'yAxes',
    width: 5,
  });

  it('should update the line width for the y-axis to 5.', () => {
    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 5 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 5 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
    });
  });

  it('should update the line width for the x-axis to 5.', () => {
    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_AXIS_GRID_LINE_WIDTH,
      axis: 'xAxes',
      width: 5,
    });

    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 5 }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 5 }, abc: true }],
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
    });

    expect(state.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, lineWidth: 1 }, abc: true }],
    });
  });
});

describe('UPDATE_AXIS_GRID_LINE_COLOUR', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      line: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      pie: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      doughnut: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      polar: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      radar: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
      scatter: {
        scales: {
          yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
          xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_GRID_LINE_COLOUR,
    axis: 'yAxes',
    colour: '#123',
  });

  it('should update the line colour for the y-axis.', () => {
    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#123' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#123' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
    });
  });

  it('should update the line colour for the x-axis.', () => {
    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_AXIS_GRID_LINE_COLOUR,
      axis: 'xAxes',
      colour: '#123',
    });

    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#123' }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#123' }, abc: true }],
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
    });

    expect(state.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
      xAxes: [{ gridLines: { display: false, color: '#000' }, abc: true }],
    });
  });
});

describe('UPDATE_AXIS_GRID_0_LINE_WIDTH', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      line: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      pie: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      doughnut: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      polar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      radar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
      scatter: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineWidth: 1 }, abc: true },
          ],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_GRID_0_LINE_WIDTH,
    axis: 'yAxes',
    width: 5,
  });

  it('should update the line width for the y-axis to 5.', () => {
    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 5 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 5 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
    });
  });

  it('should update the line width for the x-axis to 5.', () => {
    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_AXIS_GRID_0_LINE_WIDTH,
      axis: 'xAxes',
      width: 5,
    });

    expect(reducer.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 5 }, abc: true }],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 5 }, abc: true }],
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
    });

    expect(state.options.line.scales).toEqual({
      yAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
      xAxes: [{ gridLines: { display: false, zeroLineWidth: 1 }, abc: true }],
    });
  });
});

describe('UPDATE_AXIS_GRID_0_LINE_COLOUR', () => {
  const state = {
    options: {
      bar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      line: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      pie: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      doughnut: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      'horizontal bar': {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      polar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      radar: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
      scatter: {
        scales: {
          yAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
          xAxes: [
            { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
          ],
        },
      },
    },
  };

  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AXIS_GRID_0_LINE_COLOUR,
    axis: 'yAxes',
    colour: '#123',
  });

  it('should update the line colour for the y-axis.', () => {
    expect(reducer.options.bar.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#123' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#123' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
    });
  });

  it('should update the line colour for the x-axis.', () => {
    const reducer = graphOptionsReducer(state, {
      type: actionTypes.UPDATE_AXIS_GRID_0_LINE_COLOUR,
      axis: 'xAxes',
      colour: '#123',
    });

    expect(reducer.options.bar.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#123' }, abc: true },
      ],
    });

    expect(reducer.options.line.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#123' }, abc: true },
      ],
    });
  });

  it('should not mutate the original state.', () => {
    expect(state.options.bar.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
    });

    expect(state.options.line.scales).toEqual({
      yAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
      xAxes: [
        { gridLines: { display: false, zeroLineColor: '#000' }, abc: true },
      ],
    });
  });
});

describe('UPDATE_AGGREGATION_METHOD', () => {
  const state = { aggregation: 'SUM' };
  const reducer = graphOptionsReducer(state, {
    type: actionTypes.UPDATE_AGGREGATION_METHOD,
    method: 'COUNT',
  });

  it('should update the aggregation method to `COUNT`', () => {
    expect(reducer.aggregation).toEqual('COUNT');
  });

  it('should not mutate the original state.', () => {
    expect(state.aggregation).toEqual('SUM');
  });
});
