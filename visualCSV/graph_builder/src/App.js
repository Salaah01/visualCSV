// Third Party Imports
import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

// Local Imports
import Tables from './containers/Tables/Tables';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Graph Builder JS</h1>
        <DragDropContext>
          <Tables />
        </DragDropContext>
      </Fragment>
    );
  }
}
export default App;
