/**Creates the graph element. */

// IMPORTS
// Third Party Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import randomFlatColours from 'random-flat-colors';

// Local Imports
import classes from './GraphOptions.module.scss';
import * as actions from '../../store/actions';
import LineOptions from '../../components/GraphOptions/Line';

class Graph extends Component {
  graphTypeDropdown = () => {
    /**Drop down menu where users can select the graph type. */
    const options = [
      'Bar',
      'Line',
      'Pie',
      'Doughnut',
      'Horizontal Bar',
      'Polar',
      'Scatter',
      'Radar',
    ].map((option) => (
      <Fragment key={option}>
        <label
          className="dropdown_menu__options__label"
          htmlFor={`graph_option_${option}`}
        >
          {option}
        </label>
        <input
          className="dropdown_menu__options__radio_btn"
          type="radio"
          name={option}
          id={`graph_option_${option}`}
          value={option}
          onClick={() => this.props.onUpdateType(option)}
        />
      </Fragment>
    ));

    return (
      <form>
        <div className="dropdown_menu">
          <div className="dropdown_menu__selected">
            <span>Bar</span>
          </div>
          <div className="dropdown_menu__options dropdown_menu__options--hide">
            {options}
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div className={classes.graph_options}>
        <h1>Graph Options</h1>
        <this.graphTypeDropdown />
        <LineOptions />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    graphType: state.graphOptions.graphType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateType: (graphType) => dispatch(actions.updateGraphType(graphType)),
    onUpdateYAxisStackOpt: (opt, graphType) =>
      dispatch(actions.updateYAxisStackOpt(opt, graphType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
