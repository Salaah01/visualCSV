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
    xAxisColourPicker: false,
    yAxisColourPicker: false,
  };

  graphOptions = (axis) => {
    /**Options for the current graph.
     * Args:
     *  axis: (str) Axis name (xAxes/yAxes).
     */

    return this.props.options[this.props.graphType].scales[axis][0];

    const baseOptions = this.props.options[this.props.graphType].scales[axis];
    const options = {};
    for (const option of baseOptions) {
      const propName = Object.keys(option);
      options[propName] = option[propName];
    }

    return options;
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

  display = (axis) => {
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
          onChange={() => this.props.onToggleDisplay(axis, currDisplay)}
        />
      </div>
    );
  };

  label = (axis) => (
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

  fontSize = (axis) => {
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
            this.props.onUpdateFontSize(axis, +event.target.value)
          }
        >
          {optionElems}
        </select>
      </div>
    );
  };

  onColourPickerClick = (axis) => {
    /**Click handler for when the user clicks on the colour picker. */
    if (axis === 'xAxes') {
      this.setState({ xAxisColourPicker: true });
    } else {
      this.setState({ yAxisColourPicker: true });
    }

    document.addEventListener('click', this.onClickOutColourPicker, false);
  };

  onColourChangeHandler = (axis, colour) => {
    /**Change handler for when the user chooses a new colour. */
    const rgba = colour.rgb;
    return this.props.onUpdateColour(
      axis,
      `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
    );
  };

  onClickOutColourPicker = (event) => {
    /**Click handler for when the user clicks outside anywhere the colour
     * picker.
     */
    if (!this.node.contains(event.target)) {
      this.setState({ xAxisColourPicker: false, yAxisColourPicker: false });
      document.removeEventListener('click', this.onClickOutColourPicker, false);
    }
  };

  colour = (axis) => {
    /**Options to change the font colour for a given axis label. */

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
        onClick={() => this.onColourPickerClick(axis)}
      />
    );

    let colourPicker = null;

    const showColourPicker =
      axis === 'xAxes'
        ? this.state.xAxisColourPicker
        : this.state.yAxisColourPicker;

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
              this.onColourChangeHandler(axis, colour)
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
          {this.display('xAxes')}
          {this.label('xAxes')}
          {this.fontSize('xAxes')}
          {this.colour('xAxes')}
          {this.display('yAxes')}
          {this.label('yAxes')}
          {this.fontSize('yAxes')}
          {this.colour('yAxes')}
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
    onToggleDisplay: (axis, currDisplay) =>
      dispatch(actions.toggleAxisLabelDisplay(axis, currDisplay)),
    onUpdateLabel: (axis, label) =>
      dispatch(actions.updateAxisLabel(axis, label)),
    onUpdateFontSize: (axis, size) =>
      dispatch(actions.updateAxisFontSize(axis, size)),
    onUpdateColour: (axis, colour) =>
      dispatch(actions.updateAxisFontColour(axis, colour)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Axes);
