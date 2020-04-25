// Third Party Imports
import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// Local Imports
import GraphData from './containers/GraphData/GraphData';
import Tables from './containers/Tables/Tables';

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('source', source);
    console.log('destination', destination);
    console.log('draggableId', draggableId);
  };

  render() {
    return (
      <Fragment>
        <h1>Graph Builder JS</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <GraphData />
          <Tables />
        </DragDropContext>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    columns: state.graphData.columns,
    tables: state.graphData.tables,
    sections: state.sections,
  };
};

export default connect(mapStateToProps)(App);
