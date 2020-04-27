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
import Graphs from '../../components/Graphs/Graphs';

class Graph extends Component {
  state = {
    type: 'Line',
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

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
    let dataSets = [];
    for (const column of this.props.sections.legends.columns) {
      const dataSet = this.props.dataSets[column];
      if (dataSet) {
        dataSets.push({
          label: dataSet.label,
          data: dataSet.data,
          backgroundColor: dataSet.backgroundColor,
          borderColor: dataSet.borderColor,
          borderWidth: dataSet.borderWidth,
        });
      }
    }

    return dataSets;
  };

  render() {
    const data = {
      labels: this.xAxis(),
      datasets: this.legends(),
    };

    const graph = Graphs(this.state.type, {
      data: data,
      width: 100,
      height: 200,
      options: this.state.options,
    });

    return <div>{graph}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.graphData.sections,
    columns: state.graphData.columns,
    dataSets: state.graphData.dataSets,
  };
};

export default connect(mapStateToProps)(Graph);
