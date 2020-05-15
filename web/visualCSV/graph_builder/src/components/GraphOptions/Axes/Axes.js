/**The legend option in the graph options section. */

// IMPORTS
// Third Party Import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

// Local Imports
import * as actions from '../../../store/actions';
import sharedClasses from '../Shared/Shared.module.scss';
import classes from './Axes.module.scss';

class Axes extends PureComponent {
  /**Crates the axes options for the graph. */

  state = {
    xAxisOptions: true,
    yAxisOptions: true,
    xAxisLabelColPicker: false,
    yAxisLabelColPicker: false,
    xAxisGridLinesColPicker: false,
    yAxisGridLinesColPicker: false,
    xAxisGrid0LineColPicker: false,
    yAxisGrid0LineColPicker: false,
  };

  graphOptions = (axis) => {
    /**Options for the current graph.
     * Args:
     *  axis: (str) Axis name (xAxes/yAxes).
     */

    return this.props.options[this.props.graphType].scales[axis][0];
  };

  axesTextVersion = (axes, titleCase = false, pluralVersion = false) => {
    /**Helper method to return a text representation of `axes`.
     * Args:
     *  axis: (str) Axis.
     * titleCase: (bool) Should the out be presented in title case?
     * pluralVersion: (bool) Should the plural version of the parsed axis be
     *  returned?
     */

    if (axes !== 'xAxes' && axes !== 'yAxes') {
      throw Error(
        `axes must equal either 'xAxes' or 'yAxes'. (provided ${axes})`,
      );
    }

    if (titleCase) {
      if (pluralVersion) {
        return axes === 'xAxes' ? 'X-Axes' : 'Y-Axes';
      } else {
        return axes === 'xAxes' ? 'X-Axes' : 'Y-Axes';
      }
    } else {
      if (pluralVersion) {
        return axes === 'xAxes' ? 'x-axis' : 'y-axis';
      } else {
        return axes === 'xAxes' ? 'x-axis' : 'y-axis';
      }
    }
  };

  labelDisplay = (axis) => {
    const currDisplay = this.graphOptions(axis).scaleLabel.display;
    return (
      /**Option to toggle the display option. */
      <div className={sharedClasses.option}>
        <label
          htmlFor={`${axis}-display-option`}
          className={sharedClasses.option__label}
        >
          Show {this.axesTextVersion(axis, true, false)}
        </label>
        <input
          className={sharedClasses.option__input}
          type="checkbox"
          name={`display-${axis}`}
          id={`${axis}-display-option`}
          checked={currDisplay}
          onChange={() => this.props.onToggleLabelDisplay(axis, currDisplay)}
        />
      </div>
    );
  };

  labelText = (axis) => (
    /**Returns the axis text input box element which will be used to set the
     * axis label. */
    <div className={sharedClasses.option}>
      <label htmlFor={`${axis}-label`} className={sharedClasses.option__label}>
        Display Text
      </label>
      <input
        type="input"
        name="display-text"
        id={`${axis}-label`}
        placeholder={`${this.axesTextVersion(axis, true, false)} Label`}
        className={sharedClasses.option__input}
        value={this.graphOptions(axis).scaleLabel.labelString}
        onChange={(event) => this.props.onUpdateLabel(axis, event.target.value)}
      />
    </div>
  );

  labelFontSize = (axis) => {
    /**Set of options allowing the user to update the font size. */
    const options = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    const optionElems = options.map((optionElem) => (
      <option key={optionElem} value={optionElem}>
        {optionElem}
      </option>
    ));

    return (
      <div className={sharedClasses.option}>
        <label
          htmlFor={`${axis}-font-size`}
          className={sharedClasses.option__label}
        >
          Size
        </label>
        <select
          className={sharedClasses.option__select}
          defaultValue={this.graphOptions(axis).scaleLabel.fontSize}
          onChange={(event) =>
            this.props.onUpdateLabelFontSize(axis, +event.target.value)
          }
        >
          {optionElems}
        </select>
      </div>
    );
  };

  onColourPickerClick = (axis, property) => {
    /**Click handler for when the user clicks on the colour picker.
     * Args:
     *  axis: (str) Axis
     *  property: (str) Which property should be updated?
     */

    if (axis === 'xAxes') {
      switch (property) {
        case 'label':
          this.setState({ xAxisLabelColPicker: true });
          break;
        case 'grid lines':
          this.setState({ xAxisGridLinesColPicker: true });
          break;
        case 'grid line 0':
          this.setState({ xAxisGrid0LineColPicker: true });
          break;
        default:
          throw Error(`property argument (${property}) is invalid.`);
      }
    } else {
      switch (property) {
        case 'label':
          this.setState({ yAxisLabelColPicker: true });
          break;
        case 'grid lines':
          this.setState({ yAxisGridLinesColPicker: true });
          break;
        case 'grid line 0':
          this.setState({ yAxisGrid0LineColPicker: true });
          break;
        default:
          throw Error(`property argument (${property}) is invalid.`);
      }
    }

    document.addEventListener('click', this.onClickOutColourPicker, false);
  };

  onColourChangeHandler = (axis, colour, func = null) => {
    /**Change handler for when the user chooses a new colour.
     * Args:
     *  axis: (str) Axis
     *  colour: (str) Colour in the rgba format.
     *  func: (func [optional]) A function to dispatch.
     */
    const rgba = colour.rgb;
    return func(axis, `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
  };

  onClickOutColourPicker = (event) => {
    /**Click handler for when the user clicks outside anywhere the colour
     * picker. Method will set all colour pickers show option to false.
     */
    if (!this.node.contains(event.target)) {
      this.setState({
        xAxisLabelColPicker: false,
        yAxisLabelColPicker: false,
        xAxisGridLinesColPicker: false,
        yAxisGridLinesColPicker: false,
        xAxisGrid0LineColPicker: false,
        yAxisGrid0LineColPicker: false,
      });
      document.removeEventListener('click', this.onClickOutColourPicker, false);
    }
  };

  labelColour = (axis) => {
    /**Options to change the line colour for a given axis. */

    if (axis !== 'xAxes' && axis !== 'yAxes') {
      throw Error(
        'check the axis argument. Must be either `aAxes` or `yAxes`.',
      );
    }

    const currentColour = (
      <span
        className={classes.colour__current}
        style={{
          backgroundColor: this.graphOptions(axis).scaleLabel.fontColor,
        }}
        onClick={() => this.onColourPickerClick(axis, 'label')}
      />
    );

    let colourPicker = null;

    const showColourPicker =
      axis === 'xAxes'
        ? this.state.xAxisLabelColPicker
        : this.state.yAxisLabelColPicker;

    if (showColourPicker) {
      colourPicker = (
        <div
          className={classes.colour__picker}
          ref={(node) => {
            this.node = node;
          }}
        >
          <SketchPicker
            color={this.graphOptions(axis).scaleLabel.fontColor}
            onChangeComplete={(colour) =>
              this.onColourChangeHandler(
                axis,
                colour,
                this.props.onUpdateLabelColour,
              )
            }
          />
        </div>
      );
    }

    return (
      <div
        className={`${classes.colour} ${sharedClasses.option}`}
        style={{ marginBottom: '15px' }}
      >
        <label className={sharedClasses.option__label}>Colour</label>
        {currentColour}
        {colourPicker}
      </div>
    );
  };

  toggleShowXAxisSubOpts = () => {
    /**Toggles the state value for `xAxisOptions`. */
    this.setState((prevState) => ({ xAxisOptions: !prevState.xAxisOptions }));
  };

  toggleShowYAxisSubOpts = () => {
    /**Toggles the state value for `yAxisOptions`. */
    this.setState((prevState) => ({ yAxisOptions: !prevState.yAxisOptions }));
  };

  gridLinesDisplay = (axis) => {
    /**Option to toggle the grid lines display option. */
    const currDisplay = this.graphOptions(axis).gridLines.display;

    return (
      <div className={sharedClasses.option}>
        <label
          htmlFor={`${axis}-grid-lines-display-option`}
          className={sharedClasses.option__label}
        >
          Show Grid Lines
        </label>
        <input
          className={sharedClasses.option__input}
          type="checkbox"
          name={`display-${axis}`}
          id={`${axis}-grid-lines-display-option`}
          checked={currDisplay}
          onChange={() => this.props.onToggleAxisGridDisplay(axis)}
        />
      </div>
    );
  };

  gridLineWidth = (axis) => {
    /**Set of options allowing the user to update the grid line width. */
    const options = [0.25, 0.5, 0.75, 1, 1.5, 2.25, 3, 4.5, 6];
    const optionElems = options.map((optionElem) => (
      <option key={optionElem} value={optionElem}>
        {optionElem}
      </option>
    ));

    return (
      <div className={sharedClasses.option}>
        <label
          htmlFor={`${axis}-grid-line-width`}
          className={sharedClasses.option__label}
        >
          Line Width
        </label>
        <select
          className={sharedClasses.option__select}
          defaultValue={this.graphOptions(axis).gridLines.lineWidth}
          onChange={(event) =>
            this.props.onUpdateAxisGridLineWidth(axis, +event.target.value)
          }
        >
          {optionElems}
        </select>
      </div>
    );
  };

  gridLineColour = (axis) => {
    /**Options to change the font colour for the grid line for a given axis. */

    if (axis !== 'xAxes' && axis !== 'yAxes') {
      throw Error(
        'check the axis argument. Must be either `aAxes` or `yAxes`.',
      );
    }

    const currentColour = (
      <span
        className={classes.colour__current}
        style={{
          backgroundColor: this.graphOptions(axis).gridLines.color,
        }}
        onClick={() => this.onColourPickerClick(axis, 'grid lines')}
      />
    );

    let colourPicker = null;

    const showColourPicker =
      axis === 'xAxes'
        ? this.state.xAxisGridLinesColPicker
        : this.state.yAxisGridLinesColPicker;

    if (showColourPicker) {
      colourPicker = (
        <div
          className={classes.colour__picker}
          ref={(node) => {
            this.node = node;
          }}
        >
          <SketchPicker
            color={this.graphOptions(axis).gridLines.color}
            onChangeComplete={(colour) =>
              this.onColourChangeHandler(
                axis,
                colour,
                this.props.onUpdateAxisGridLineColour,
              )
            }
          />
        </div>
      );
    }

    return (
      <div
        className={`${classes.colour} ${sharedClasses.option}`}
        style={{ marginBottom: '15px' }}
      >
        <label className={sharedClasses.option__label}>Line Colour</label>
        {currentColour}
        {colourPicker}
      </div>
    );
  };

  grid0LineWidth = (axis) => {
    /**Set of options allowing the user to update the grid line width at the
     * 0'th value for a given `axis`.
     */
    const options = [0.25, 0.5, 0.75, 1, 1.5, 2.25, 3, 4.5, 6];
    const optionElems = options.map((optionElem) => (
      <option key={optionElem} value={optionElem}>
        {optionElem}
      </option>
    ));

    return (
      <div className={sharedClasses.option}>
        <label
          htmlFor={`${axis}-grid-line-width-at-0`}
          className={sharedClasses.option__label}
        >
          Line Width at 0
        </label>
        <select
          className={sharedClasses.option__select}
          defaultValue={this.graphOptions(axis).gridLines.lineWidth}
          onChange={(event) =>
            this.props.onUpdateAxisGrid0LineWidth(axis, +event.target.value)
          }
        >
          {optionElems}
        </select>
      </div>
    );
  };

  grid0LineColour = (axis) => {
    /**Options to change the line colour at the 0th value in a given axis. */

    if (axis !== 'xAxes' && axis !== 'yAxes') {
      throw Error(
        'check the axis argument. Must be either `aAxes` or `yAxes`.',
      );
    }

    const currentColour = (
      <span
        className={classes.colour__current}
        style={{
          backgroundColor: this.graphOptions(axis).gridLines.zeroLineColor,
        }}
        onClick={() => this.onColourPickerClick(axis, 'grid line 0')}
      />
    );

    let colourPicker = null;

    const showColourPicker =
      axis === 'xAxes'
        ? this.state.xAxisGrid0LineColPicker
        : this.state.yAxisGrid0LineColPicker;

    if (showColourPicker) {
      colourPicker = (
        <div
          className={classes.colour__picker}
          ref={(node) => {
            this.node = node;
          }}
        >
          <SketchPicker
            color={this.graphOptions(axis).gridLines.color}
            onChangeComplete={(colour) =>
              this.onColourChangeHandler(
                axis,
                colour,
                this.props.onUpdateAxisGrid0LineColour,
              )
            }
          />
        </div>
      );
    }

    return (
      <div
        className={`${classes.colour} ${sharedClasses.option}`}
        style={{ marginBottom: '15px' }}
      >
        <label className={sharedClasses.option__label}>Line Colour at 0</label>
        {currentColour}
        {colourPicker}
      </div>
    );
  };

  allOptions = () => {
    /**Container with all the options. */

    // Dynamically update the text/style of the main container allowing it to
    // become collapsable.
    const headingText = this.props.showOptions
      ? 'Hide Axes Options'
      : 'Show Axes Options';
    const headingIcon = this.props.showOptions ? '-' : '+';

    // Style overrides
    const headingStyle = this.props.showOptions
      ? { borderBottom: '1px solid transparent' }
      : null;
    const optionsStyle = this.props.showOptions
      ? null
      : { maxHeight: 0, padding: 0, borderBottom: 'none' };

    // Dynamically update the text/style of the sub-options container allowing
    // it to become collapsable.
    const xAxisOptText = this.state.xAxisOptions
      ? 'Hide X-Axis Options'
      : 'Show X-Axis Options';
    const xAxisOptIcon = this.state.xAxisOptions ? '-' : '+';
    const yAxisOptText = this.state.yAxisOptions
      ? 'Hide Y-Axis Options'
      : 'Show Y-Axis Options';
    const yAxisOptIcon = this.state.yAxisOptions ? '-' : '+';

    // Style overrides
    const xAxisOptStyle = this.state.xAxisOptions
      ? null
      : { maxHeight: 0, padding: 0 };
    const yAxisOptStyle = this.state.yAxisOptions
      ? null
      : { maxHeight: 0, padding: 0 };

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
          className={`${sharedClasses.options_container__options} ${classes.options_container__options}`}
          style={optionsStyle}
        >
          <div className={classes.sub_options}>
            <p
              className={classes.sub_options__heading}
              onClick={this.toggleShowXAxisSubOpts}
            >
              <span>{xAxisOptText}</span>
              <span>{xAxisOptIcon}</span>
            </p>
            <div className={classes.sub_options__options} style={xAxisOptStyle}>
              {this.labelDisplay('xAxes')}
              {this.labelText('xAxes')}
              {this.labelFontSize('xAxes')}
              {this.labelColour('xAxes')}
              {this.gridLinesDisplay('xAxes')}
              {this.gridLineWidth('xAxes')}
              {this.gridLineColour('xAxes')}
              {this.grid0LineWidth('xAxes')}
              {this.grid0LineColour('xAxes')}
            </div>
          </div>

          <div className={classes.sub_options}>
            <p
              className={classes.sub_options__heading}
              onClick={this.toggleShowYAxisSubOpts}
            >
              <span>{yAxisOptText}</span>
              <span>{yAxisOptIcon}</span>
            </p>
            <div className={classes.sub_options__options} style={yAxisOptStyle}>
              {this.labelDisplay('yAxes')}
              {this.labelText('yAxes')}
              {this.labelFontSize('yAxes')}
              {this.labelColour('yAxes')}
              {this.gridLinesDisplay('yAxes')}
              {this.gridLineWidth('yAxes')}
              {this.gridLineColour('yAxes')}
              {this.grid0LineWidth('yAxes')}
              {this.grid0LineColour('yAxes')}
            </div>
          </div>
        </div>
      </div>
    );

    return options;
  };

  render() {
    return this.allOptions();
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
    onToggleLabelDisplay: (axis, currDisplay) =>
      dispatch(actions.toggleAxisLabelDisplay(axis, currDisplay)),
    onUpdateLabel: (axis, label) =>
      dispatch(actions.updateAxisLabel(axis, label)),
    onUpdateLabelFontSize: (axis, size) =>
      dispatch(actions.updateAxisFontSize(axis, size)),
    onUpdateLabelColour: (axis, colour) =>
      dispatch(actions.updateAxisFontColour(axis, colour)),
    onToggleAxisGridDisplay: (axis) =>
      dispatch(actions.toggleAxisGridDisplay(axis)),
    onUpdateAxisGridLineWidth: (axis, width) =>
      dispatch(actions.updateAxisGridLineWidth(axis, width)),
    onUpdateAxisGridLineColour: (axis, colour) =>
      dispatch(actions.updateAxisGridLineColour(axis, colour)),
    onUpdateAxisGrid0LineWidth: (axis, width) =>
      dispatch(actions.updateAxisGrid0LineWidth(axis, width)),
    onUpdateAxisGrid0LineColour: (axis, colour) =>
      dispatch(actions.updateAxisGrid0LineColour(axis, colour)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Axes);
