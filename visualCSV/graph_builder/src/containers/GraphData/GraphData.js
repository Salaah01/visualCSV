/**The graph data container contains two droppable components. Theres are the
 * x-axis component and the legends component.
 */

// IMPORTS
// Third Party Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Local Imports
import classes from './GraphData.module.scss';
import * as actions from '../../store/actions';
import Spinner from '../../../../shared_js_components/UI/spinners/spinner1/Spinner';

class GraphData extends Component {
  state = {};

  xAxis = () => {
    /**The main container for the x-axis column. */
    return (
      <Droppable droppableId="xAxis" key="xAxis">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '50px', backgroundColor: 'green' }}
          >
            <p>X Axis</p>
            {this.section_contents(this.props.sections.xAxis.column)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  legends = () => {
    /**The main container for the legends container. */
    return (
      <Droppable droppableId="legends" key="legend">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '50px', backgroundColor: 'orangered' }}
          >
            <p>Legend</p>
            {this.section_contents(this.props.sections.legends.columns)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };

  section_contents = (columns) => {
    /**Returns the contents of a section's columns as a list of `Draggable`
     * components.
     * Args:
     *  columns: (list) A set of columns belonging to a section.
     */
    let contents = null;

    if (columns.length) {
      contents = columns.map((columnID, idx) => {
        const column = this.props.columns[columnID];
        return (
          <Draggable draggableId={columnID} key={columnID} index={idx}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                ref={provided.innerRef}
                key={columnID}
                {...provided.dragHandleProps}
              >
                <div>{column.columnName}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphData);
