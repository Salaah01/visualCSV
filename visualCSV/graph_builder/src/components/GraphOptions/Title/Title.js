/**The title option in the graph options section.. */

// IMPORTS
// Third Party Import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

// Local Imports
import * as actions from '../../../store/actions';
import sharedClasses from '../Shared/Shared.module.scss';
import classes from './Title.module.scss';

class Title extends PureComponent {
  /**Creates the tile options for the graph. */

  state = {
    showColourPicker: false,
  };

  graphTitleOptions = () =>
    /**Title options for the current graph. */
    this.props.options[this.props.graphType].title;

  displayOption = () => (
    /**Returns the display checkbox. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="title-display-option"
        className={sharedClasses.option__label}
      >
        Show Title
      </label>
      <input
        className={sharedClasses.option__input}
        type="checkbox"
        name="display-title"
        id="title-display-option"
        checked={this.graphTitleOptions().display}
        onChange={this.props.onToggleTitleDisplay}
      />
    </div>
  );

  text = () => (
    /**Returns the display text input box element. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="title-text"
        className={sharedClasses.option__label}
      >
        Display Text
      </label>
      <input
        type="input"
        name="title-text"
        id="title-text"
        placeholder="Graph Title"
        className={sharedClasses.option__input}
        value={this.graphTitleOptions().text}
        onChange={(event) => this.props.onUpdateText(event.target.value)}
      />
    </div>
  );

  position = () => (
    /**Set of options allowing the user to update the display position. */
    <div className={sharedClasses.option}>
      <label
        htmlFor="title-position"
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

  fontSize = () => {
    /**Set of options allowing the user to update the display font size. */
    const options = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    const optionElems = options.map((optionElem) => (
      <option key={optionElem} value={optionElem}>
        {optionElem}
      </option>
    ));

    return (
      <div className={sharedClasses.option}>
        <label
          htmlFor="title-display-font-size"
          className={sharedClasses.option__label}
        >
          Size
        </label>
        <select
          className={sharedClasses.option__select}
          defaultValue={this.graphTitleOptions().fontSize}
          onChange={(event) => this.props.onUpdateFontSize(+event.target.value)}
        >
          {optionElems}
        </select>
      </div>
    );
  };

  onColourPickerClick = () => {
    /**Click handler for when the user clicks on the colour picker. */
    this.setState({ showColourPicker: true });
    document.addEventListener('click', this.onClickOutColourPicker, false);
  };

  onColourChangeHandler = (colour) => {
    /**Change handler for when the user chooses a new colour. */
    const rgba = colour.rgb;
    return this.props.onUpdateColour(
      `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
    );
  };

  onClickOutColourPicker = (event) => {
    /**Click handler for when the user clicks outside anywhere the colour
     * picker.
     */
    if (!this.node.contains(event.target)) {
      this.setState({ showColourPicker: false });
      document.removeEventListener('click', this.onClickOutColourPicker, false);
    }
  };

  colour = () => {
    /**Options to change the title colour. */
    const currentColour = (
      <span
        className={classes.colour__current}
        style={{ backgroundColor: this.graphTitleOptions().fontColor }}
        onClick={this.onColourPickerClick}
      />
    );

    let colourPicker = null;

    if (this.state.showColourPicker) {
      colourPicker = (
        <div
          className={classes.colour__picker}
          ref={(node) => {
            this.node = node;
          }}
        >
          <SketchPicker
            color={this.graphTitleOptions().fontColor}
            onChangeComplete={(colour) => this.onColourChangeHandler(colour)}
          />
        </div>
      );
    }

    return (
      <div className={`${classes.colour} ${sharedClasses.option}`}>
        <label className={sharedClasses.option__label}>Colour</label>
        {currentColour}
        {colourPicker}
      </div>
    );
  };

  titleOptions = () => {
    /**Container with all the options. */

    const headingText = this.props.showOptions
      ? 'Hide Title Options'
      : 'Show Title Options';
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
          {this.displayOption()}
          {this.text()}
          {this.position()}
          {this.fontSize()}
          {this.colour()}
        </div>
      </div>
    );

    return options;
  };

  render() {
    return this.titleOptions();
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
    onToggleTitleDisplay: () => dispatch(actions.toggleTitleDisplay()),
    onUpdateText: (text) => dispatch(actions.updateDisplayText(text)),
    onUpdatePosition: (pos) => dispatch(actions.updateDisplayPosition(pos)),
    onUpdateFontSize: (size) => dispatch(actions.updateDisplayFontSize(size)),
    onUpdateColour: (colour) =>
      dispatch(actions.updateDisplayFontColour(colour)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
