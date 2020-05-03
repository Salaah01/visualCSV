/**The legend option in the graph options section. */

// IMPORTS
// Third Party Import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Local Imports
import * as actions from '../../../store/actions';
import sharedClasses from '../Shared/Shared.module.scss';
import classes from './Legend.module.scss';

class Legend extends PureComponent {
  /**Crates the legend options for the graph. */

  graphOptions = () =>
    /**Options for the current graph. */
    this.props.options[this.props.graphType].legend;

  display = () => (
    /**Option to toggle the display option. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="legend-display-option"
        className={sharedClasses.option__label}
      >
        Show Legend
      </label>
      <input
        className={sharedClasses.option__input}
        type="checkbox"
        name="display-legend"
        id="legend-display-option"
        checked={this.graphOptions().display}
        onChange={this.props.onToggleDisplay}
      />
    </div>
  );

  position = () => (
    /**Set of options allowing the user to update the legend position. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="legend-position"
        className={sharedClasses.option__label}
      >
        Position
      </label>
      <select
        className={sharedClasses.option__select}
        onChange={(event) => this.props.onUpdatePosition(event.target.value)}
      >
        <option value="top">Top</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
      </select>
    </div>
  );

  alignment = () => (
    /**Set of options allowing the user to update the legend alignment. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="legend-legend-alignment"
        className={sharedClasses.option__label}
      >
        Alignment
      </label>
      <select
        className={sharedClasses.option__select}
        onChange={(event) => this.props.onUpdateAlignment(event.target.value)}
      >
        <option value="top">Top</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="bottom">Bottom</option>
      </select>
    </div>
  );

  legendOptions = () => {
    /**Container with all the options. */

    const headingText = this.props.showOptions
      ? 'Hide Legend Options'
      : 'Show Legend Options';
    const headingIcon = this.props.showOptions ? '-' : '+';

    // Style overrides
    const headingStyle = this.props.showOptions
      ? { borderBottom: '1px solid transparent' }
      : null;
    const optionsStyle = this.props.showOptions
      ? null
      : { maxHeight: 0, padding: 0, borderBottom: 'none' };

    const options = (
      <div className={sharedClasses.options_container}>
        <h3
          className={sharedClasses.options_container__heading}
          onClick={this.props.onToggleShowOptions}
          style={headingStyle}
        >
          <span className={sharedClasses.options_container__heading__text}>
            {headingText}
          </span>
          <span className={sharedClasses.options_container__heading__icon}>
            {headingIcon}
          </span>
        </h3>
        <div
          className={sharedClasses.options_container__options}
          style={optionsStyle}
        >
          {this.display()}
          {this.position()}
          {this.alignment()}
        </div>
      </div>
    );

    return options;
  };

  render() {
    return this.legendOptions();
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.graphOptions.options,
    graphType: state.graphOptions.graphType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleDisplay: () => dispatch(actions.toggleLegendDisplay()),
    onUpdatePosition: (pos) => dispatch(actions.updateLegendPosition(pos)),
    onUpdateAlignment: (size) => dispatch(actions.updateLegendAlignment(size)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Legend);
