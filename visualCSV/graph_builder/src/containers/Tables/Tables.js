/**The tables container which contains the collection of tables from which
 * the user can select the x-axis, and data to display onto the graph from.
 */

// IMPORTS
// Third Party Imports
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// Local Imports
import classes from './Tables.module.scss';
import * as actions from '../../store/actions';

// class TableList extends PureComponent {
//   render() {
//     const { table, columnsMap, index } = this.props;

//     const tasks = table.columns.map((column) => (
//       <li>{columnsMap[column].id}</li>
//     ));

//     // const tasks = column.columns.map((taskId) => taskMap[taskId]);
//     return <ul>{tasks}</ul>;
//     return <Column column={column} tasks={tasks} index={index} />;
//   }
// }

class Tables extends Component {
  componentDidMount() {
    this.fetchTableData();
  }

  fetchTableData = () => {
    /**Retrieves the information on the tables that belong to the user. */
    fetch(location.href + 'table_meta_data_api')
      .then((response) =>
        response.json().then((data) => this.props.onSetUserTablesData(data)),
      )
      .catch((error) => console.log(error));
  };

  render() {
    let tables = <p>Loading Tables</p>;
    if (this.props.tables) {
      tables = Object.keys(this.props.tables).map((tableId) => {
        const table = this.props.tables[tableId];

        const columns = table.columns.map((columnId, idx) => {
          const column = this.props.columns[columnId];
          console.log('column args:', columnId, idx);
          return (
            <Draggable draggableId={columnId} key={columnId} index={idx}>
              {(provided) => (
                <div
                  // innerRef={provided.innerRef}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  key={columnId}
                  {...provided.dragHandleProps}
                >
                  <div>{column.columnName}</div>
                </div>
              )}
            </Draggable>
          );
        });

        return (
          <Droppable droppableId={tableId} key={tableId}>
            {(provided) => (
              <div
                className={classes.tables__table}
                key={tableId}
                table={tableId}
                // innerRef={provided.innerRef}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <p>{table.tableAlias}</p>
                {columns}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      });
    }

    return (
      <div className={classes.tables}>
        <p>Tables</p>
        {tables}
      </div>
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
    onSetUserTablesData: (data) => dispatch(actions.setUserTablesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
