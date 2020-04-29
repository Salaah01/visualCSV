/**Line graph options */

// IMPORTS
// Third Party Imports
import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';

// Local Imports
import * as actions from '../../store/actions';

class Line extends Component {
  options = () => {
    /**Sets the options in format that is easy to access properties. */
    const scales = { xAxes: {}, yAxes: {} };

    for (const option of this.props.lineOptions.scales.xAxes) {
      Object.assign(scales.xAxes, option);
    }

    for (const option of this.props.lineOptions.scales.yAxes) {
      Object.assign(scales.yAxes, option);
    }

    return { scales: scales };
  };

  yAxisStackOptHandler = (event) => {
    /**Handle changes to the y-axis stack option. */
    this.props.onUpdateYAxisStackOpt(event.target.value === 'true');
  };

  render() {
    const yAxisStackOpt = (
      <select onChange={this.yAxisStackOptHandler}>
        <option selected={this.options().scales.yAxes.stacked} value="true">
          Yes
        </option>
        <option selected={!this.options().scales.yAxes.stacked} value="false">
          No
        </option>
      </select>
    );

    return yAxisStackOpt;
  }
}

const mapStateToProps = (state) => {
  return {
    lineOptions: state.graphOptions.options.line,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateYAxisStackOpt: (opt) =>
      dispatch(actions.updateYAxisStackOpt(opt, 'line')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);
