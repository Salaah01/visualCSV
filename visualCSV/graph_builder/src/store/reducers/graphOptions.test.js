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
