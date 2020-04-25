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

class GraphData extends Component {
  xAxis = () => {
    return (
      <Droppable droppableId="xAxis" key="xAxis">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '50px', backgroundColor: 'green' }}
          >
            <p>X Axis</p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };


  legend = () => {
    return (
      <Droppable droppableId="legend" key="legend">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '50px', backgroundColor: 'orangered' }}
          >
            <p>Legend</p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  render() {
    return (
      <Fragment>
        <this.xAxis />
        <this.legend />
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

export default connect(mapStateToProps)(GraphData);
