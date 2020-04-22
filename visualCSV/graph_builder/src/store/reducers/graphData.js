/**Redux reducer that is used for building the main graph. */

const initialState = {
  columns: {},
  sections: {
    xAxis: {
      id: 'xAxis',
      column: null,
    },
    legends: {
      id: 'legends',
      columns: [],
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
