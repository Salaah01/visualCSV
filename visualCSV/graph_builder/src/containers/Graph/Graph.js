/**Creates the graph element. */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Local Imports
import classes from './Graph.module.scss';
import * as actionTypes from '../../store/actions';
import Spinner from '../../../../shared_js_components/UI/spinners/spinner1/Spinner';
import GraphData from '../GraphData/GraphData';

class Graph extends Component {
  xAxis = () => {
    let labels = [];
    if (this.props.sections.xAxis.column.length) {
      const column = this.props.sections.xAxis.column;
      if (this.props.columns[column].data) {
        labels = this.props.columns[column].data;
      }
    }
    return labels;
  };

  legends = () => {
    let dataSets = []


  }

  render() {
    return <h1>Graph</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.graphData.sections,
    columns: state.graphData.columns,
  };
};

export default connect(mapStateToProps)(Graph);
