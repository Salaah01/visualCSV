/**Creates the graph element. */

// IMPORTS
// Third Party Imports
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Local Imports
import classes from './GraphOptions.module.scss';
import * as actions from '../../store/actions';
import GraphTypeDropDown from '../../components/GraphOptions/GraphTypeDropDown/GraphTypeDropDown';
import TitleOptions from '../../components/GraphOptions/Shared/Title/Title';

class Graph extends Component {
  state = {
    showTitleOpts: true,
    showLegendOpts: true,
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
