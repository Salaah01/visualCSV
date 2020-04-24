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

class TableList extends PureComponent {
  render() {
    const { table, columnsMap, index } = this.props;


    const tasks = table.columns.map((column) => (
      <li>{columnsMap[column].id}</li>
    ));

    // const tasks = column.columns.map((taskId) => taskMap[taskId]);
    return <ul>{tasks}</ul>;
    return <Column column={column} tasks={tasks} index={index} />;
  }
}

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
    console.log('ZZZZZZ', this.props.tables, this.props.columns);

    let innerList = null;
    if (this.props.tables) {
      console.log(Object.keys(this.props.tables));

      innerList = Object.keys(this.props.tables).map((tableName, idx) => {
        const table = this.props.tables[tableName];

        return (
          <TableList
            key={tableName}
            table={table}
            columnsMap={this.props.columns}
            index={idx}
          />
        );
      });
    }

    return (
      <Droppable droppableId="all-tables">
        {(provided) => (
          <div
            {...provided.droppableProps}
            innerRef={provided.innerRef}
            ref={provided.innerRef}
            className={classes.Tables}
          >
            {innerList}
          </div>
        )}
      </Droppable>
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
