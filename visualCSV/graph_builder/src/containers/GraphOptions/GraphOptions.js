/**Creates the graph element. */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Local Imports
import classes from './GraphOptions.module.scss';
import * as actions from '../../store/actions';
import GraphTypeDropDown from '../../components/GraphOptions/GraphTypeDropDown/GraphTypeDropDown';
import TitleOptions from '../../components/GraphOptions/Title/Title';
import LegendOptions from '../../components/GraphOptions/Legend/Legend';
import AxesOptions from '../../components/GraphOptions/Axes/Axes';

class Graph extends Component {
  state = {
    showTitleOpts: false,
    showLegendOpts: false,
    showAxesOpts: true,
  };

  toggleShowOptions = (option) =>
    /**Toggles the state's value. for a particular option.
     * Args:
     *  option: (str) Name of the option to toggle.
     */
    this.setState((prevState) => ({ [option]: !prevState[option] }));

  render() {
    return (
      <div className={classes.graph_options}>
        <h2 className={classes.graph_options__heading}>Graph Options</h2>
        <GraphTypeDropDown onUpdateType={this.props.onUpdateType} />
        <TitleOptions
          showOptions={this.state.showTitleOpts}
          onToggleShowOptions={() => this.toggleShowOptions('showTitleOpts')}
        />
        <LegendOptions
          showOptions={this.state.showLegendOpts}
          onToggleShowOptions={() => this.toggleShowOptions('showLegendOpts')}
        />
        <AxesOptions
          showOptions={this.state.showAxesOpts}
          onToggleShowOptions={() => this.toggleShowOptions('showAxesOpts')}
        />
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
