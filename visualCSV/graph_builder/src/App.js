// Third Party Imports
import React, { Component, Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

// Local Imports
import Tables from './containers/Tables/Tables';
import GraphData from './containers/GraphData/GraphData';
import Graph from './containers/Graph/Graph';
import * as actions from './store/actions';

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log('source', source);
    console.log('destination', destination);
    console.log('draggableId', draggableId);
    console.log(result);

    // Edge cases
    if (!destination) {
      return;
    }

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

    // Retrieve and store the contents of a column if the user has moved it to
    // either the x-axis or the legend and then add it as a dataset.
    if (
      destination.droppableId == 'xAxis' ||
      destination.droppableId == 'legends'
    ) {
      this.updateData(source.droppableId, draggableId);
      // this.props.onAddDataSet(
      //   draggableId,
      //   this.props.columns[draggableId].columnName,
      //   'rgba(30, 40, 50, 0.8)',
      //   null,
      //   null,
      // );
    }
  };

  updateData = (table, columnID) => {
    /**Dispatch an action to the redux store which will update a column with
     * data if it does not contain any data.
     * Args:
     *  table: Table name.
     *  columnID: A column ID which exists in the redux store. Note: the format
     *    of this arg is [column name]__[table_name]
     */

    const column = columnID.split('__' + table)[0];

    const addDataSet = () =>
      this.props.onAddDataSet(
        columnID,
        this.props.columns[columnID].columnName,
        null,
        null,
        null,
      );

    if (this.props.columns[columnID].data === undefined) {
      fetch(`${location.href}column_data_api?table=${table}&column=${column}`)
        .then((response) => {
          response.json().then((data) => {
            this.props.onSetColumnData(table, column, data);
            addDataSet();
          });
        })
        .catch((error) => console.log('error', error));
    } else {
      addDataSet();
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Graph Builder JS</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Graph />
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
    onSetColumnData: (table, column, data) =>
      dispatch(actions.setColumnData(table, column, data)),
    onAddDataSet: (columnID, label, bgColour, borderColor, borderWidth) =>
      dispatch(
        actions.addDataSet(columnID, label, bgColour, borderColor, borderWidth),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
