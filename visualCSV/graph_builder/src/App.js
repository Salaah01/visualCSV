// Third Party Imports
import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// Local Imports
import GraphData from './containers/GraphData/GraphData';
import Tables from './containers/Tables/Tables';
import * as actions from './store/actions';

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('source', source);
    console.log('destination', destination);
    console.log('draggableId', draggableId);
    console.log(result);

    // Move a column to the x-axis container.
    if (destination.droppableId === 'xAxis') {
      if (source.droppableId === 'legends') {
        this.props.onSetColumnAsXAxis(null, draggableId, 'legends');
      } else if (source.droppableId !== 'xAxis') {
        this.props.onSetColumnAsXAxis(
          source.droppableId,
          draggableId,
          'tables',
        );
      }
    }

    // Move a column to the legends container.
    else if (destination.droppableId === 'legends') {
      if (source.droppableId === 'xAxis') {
        this.props.onMoveColumnToLegends(
          null,
          draggableId,
          'xAxis',
          destination.index,
        );
      } else if (source.droppableId !== 'legends') {
        console.log(destination.index);
        this.props.onMoveColumnToLegends(
          source.droppableId,
          draggableId,
          'tables',
          destination.index,
        );
      }
    }

    // Move a column back to the tables.
    else if (destination.droppableId) {
      if (source.droppableId === 'xAxis') {
        this.props.onMoveColumnToTables(
          draggableId,
          'x-axis',
          destination.droppableId,
          destination.index,
        );
      } else if (source.droppableId === 'legends') {
        this.props.onMoveColumnToTables(
          draggableId,
          'legends',
          destination.droppableId,
          destination.index,
        );
      }
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSetColumnAsXAxis: (tableID, columnID, source) =>
      dispatch(actions.setColumnAsXAxis(tableID, columnID, source)),
    onMoveColumnToLegends: (tableID, columnID, source, destIndex) =>
      dispatch(
        actions.moveColumnToLegends(tableID, columnID, source, destIndex),
      ),
    onMoveColumnToTables: (columnID, source, destID, destIndex) =>
      dispatch(actions.moveColumnToTables(columnID, source, destID, destIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
