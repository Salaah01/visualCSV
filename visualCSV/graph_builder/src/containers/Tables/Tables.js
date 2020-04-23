/**The tables container which contains the collection of tables from which
 * the user can select the x-axis, and data to display onto the graph from.
 */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from 'react-beautiful-dnd';

// Local Imports
import classes from './Tables.module.scss';
import * as actions from '../../store/actions'

class Tables extends Component {
  componentDidMount() {
    this.fetchTableData();
  }

  fetchTableData = () => {
    fetch(location.href + 'table_meta_data_api')
      .then((response) =>
        response.json().then((data) => this.props.onSetUserTablesData(data)),
      )
      .catch((error) => console.log(error));
  };

  render() {
    // this.fetchTableData()
    return <div className={classes.Tables}>Tables</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    columns: state.graphData.columns,
    sections: state.sections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserTablesData: (data) => dispatch(actions.setUserTablesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
