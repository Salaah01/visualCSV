/**The graph data container contains two droppable components. Theres are the
 * x-axis component and the legends component.
 */

// IMPORTS
// Third Party Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Radium from 'radium';

// Local Imports
import classes from './GraphData.module.scss';
import * as actions from '../../store/actions';
import Column from '../../components/Column/Column';

class GraphData extends Component {
  state = {
    allowDrag: true,
  };

  dragOverCssOverride = {
    backgroundColor: '#2471a3',
  };

  allowDrag = () =>
    /**Allows the columns to be dragged. */
    this.setState({ allowDrag: true });

  preventDrag = () =>
    /**Prevents the columns from being dragged. */
    this.setState({ allowDrag: false });

  droppableStyle = (isDraggingOver, columnLength) => {
    /**Styling for the droppable style which dynamically changes based on
     * certain properties.
     * Args:
     *  isDraggingOver: (bool) Is the element being dragged over?
     *  columnLength: (int) The number of columns in the element.
     */

    if (isDraggingOver) {
      return { backgroundColor: 'rgba(36, 113, 163, 0.8)' };
    } else if (columnLength) {
      return { backgroundColor: '#2471a3' };
    } else {
      return { backgroundColor: '#162a3e' };
    }
  };

  xAxis = () => {
    /**The main container for the x-axis column. */
    const column = this.props.sections.xAxis.column;
    return (
      <Droppable droppableId="xAxis" key="xAxis">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.x_axis}
            style={this.droppableStyle(snapshot.isDraggingOver, column.length)}
          >
            <p className={classes.title}>X Axis</p>
            {this.section_contents(column, 'x-axis')}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  legends = () => {
    /**The main container for the legends container. */
    const columns = this.props.sections.legends.columns;
    return (
      <Droppable droppableId="legends" key="legend">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.legends}
            style={this.droppableStyle(snapshot.isDraggingOver, columns.length)}
          >
            <p className={classes.title}>Legend</p>
            {this.section_contents(columns, 'legends')}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  section_contents = (columns, section = null) => {
    /**Returns the contents of a section's columns as a list of `Draggable`
     * components.
     * Args:
     *  columns: (list) A set of columns belonging to a section.
     *  section: (str) Where does this section belong to? e.g: x-axis, legends.
     */
    let contents = null;

    const moveColumnToTables = (columnID) =>
      /**Moves a column from either the x-axis or legends section back to the
       * tables.
       * Args:
       *  columnID: The column ID of the column which is being moved.
       */
      this.props.onMoveColumnToTables(
        columnID,
        this.props.columns[columnID].table,
        null,
      );


    if (columns.length) {
      contents = columns.map((columnID, idx) => {
        const column = this.props.columns[columnID];
        return (
          <Draggable
            draggableId={columnID}
            key={columnID}
            index={idx}
            isDragDisabled={!this.state.allowDrag}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                ref={provided.innerRef}
                key={columnID}
                {...provided.dragHandleProps}
              >
                <Column
                  name={column.columnName}
                  columnID={columnID}
                  removeBtn
                  showColour
                  section={section}
                  onMoveColumnToTables={() => moveColumnToTables(columnID)}
                  onUpdateDataSetColour={this.props.onUpdateDataSetColour}
                  dataSet={this.props.dataSets[columnID]}
                  onAllowDrag={this.allowDrag}
                  onPreventDrag={this.preventDrag}
                />
              </div>
            )}
          </Draggable>
        );
      });
    }
    return contents;
  };

  render() {
    return (
      <Fragment>
        <this.xAxis />
        <this.legends />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    columns: state.graphData.columns,
    tables: state.graphData.tables,
    sections: state.graphData.sections,
    dataSets: state.graphData.dataSets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMoveColumnToTables: (columnID, source, destID, destIndex) =>
      dispatch(actions.moveColumnToTables(columnID, source, destID, destIndex)),
    onUpdateDataSetColour: (columnID, colour) =>
      dispatch(actions.updateDataSetColour(columnID, colour)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(GraphData));
