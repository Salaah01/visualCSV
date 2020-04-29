/**Creates the graph element. */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import randomFlatColours from 'random-flat-colors';

// Local Imports
import classes from './Graph.module.scss';
import Spinner from '../../../../shared_js_components/UI/spinners/spinner1/Spinner';
import Graphs from '../../components/Graphs/Graphs';
import { hexToRgb } from '../../../../core_functions/js';
import { Bar } from 'react-chartjs-2';

class Graph extends Component {
  state = {
    type: 'line',
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
          { stacked: true },
        ],
        xAxis: [
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
    /**Produces the x-axis. */
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
    /**Produces the legends. */
    let dataSets = [];
    for (const column of this.props.sections.legends.columns) {
      const dataSet = this.props.dataSets[column];
      if (dataSet) {
        let data;
        switch (this.props.graphType) {
          case 'scatter':
            data = this._scatterDataSet(dataSet);
            break;

          case 'pie':
          case 'doughnut':
          case 'polar':
            data = this._pieDataSet(dataSet);
            break;

          default:
            data = this._defaultDataSet(dataSet);
            break;
        }

        dataSets.push(data);
      }
    }

    return dataSets;
  };

  _defaultDataSet = (dataSet) => {
    /**Produces the default dataset. This will assume that the x-axis does not
     * have to be considered and that it will be mapped against the returned
     * list.
     * Args:
     *  dataSet: (obj) A a set of data from `this.props.dataSets`.
     */
    return {
      label: dataSet.label,
      data: dataSet.data,
      backgroundColor: dataSet.backgroundColor,
      borderColor: dataSet.borderColor,
      borderWidth: dataSet.borderWidth,
    };
  };

  _scatterDataSet = (dataSet) => {
    /**Produces the dataset for a scatter graph.
     * Args:
     *  dataSet: (obj) A a set of data from `this.props.dataSets`.
     */
    const data = [];
    const xAxis = this.xAxis();
    for (let i = 0; i < Math.min(xAxis.length, dataSet.data.length); i++) {
      data.push({ x: xAxis[i], y: dataSet.data[i] });
    }

    return {
      label: dataSet.label,
      fill: false,
      backgroundColor: dataSet.backgroundColor,
      borderColor: dataSet.borderColor,
      borderWidth: dataSet.borderWidth,
      pointBorderWidth: 3,
      pointHoverRadius: 7,
      pointRadius: 3,
      pointHitRadius: 10,
      data: data,
    };
  };

  _pieDataSet = (dataSet) => {
    /**Produces the dataset for a pie chart.
     * Args:
     *  dataSet: (obj) A a set of data from `this.props.dataSets`.
     */

    const bgColours = [];
    const hoverColours = [];
    for (let _ = 0; _ < dataSet.data.length; _++) {
      const colour = hexToRgb(randomFlatColours());
      const colourPre = `rgba(${colour.r}, ${colour.g}, ${colour.b}`;
      bgColours.push(`${colourPre}, 0.6)`);
      hoverColours.push(`${colourPre}, 1)`);
    }

    return {
      label: dataSet.label,
      backgroundColor: bgColours,
      hoverBackgroundColor: hoverColours,
      borderColor: hoverColours,
      data: dataSet.data,
    };
  };

  graphOptions = {};

  render() {
    const data = {
      labels: this.xAxis(),
      datasets: this.legends(),
    };

    const graph = Graphs(this.props.graphType, {
      data: data,
      options: this.props.options[this.props.graphType],
      id: 'graph',
    });

    return (
      <div
        style={{
          width: window.screen.width * 0.8,
          height: window.screen.height * 0.4,
        }}
        className={classes.graph}
      >
        {graph}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.graphData.sections,
    columns: state.graphData.columns,
    dataSets: state.graphData.dataSets,
    graphType: state.graphOptions.graphType,
    options: state.graphOptions.options,
  };
};

export default connect(mapStateToProps)(Graph);
