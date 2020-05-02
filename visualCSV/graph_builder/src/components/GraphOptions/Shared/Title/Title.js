/**The title option in the graph options. */

// IMPORTS
// Third Party Import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

// Local Imports
import * as actions from '../../../../store/actions';
import sharedClasses from '../Shared.module.scss'
import classes from './Title.module.scss';

class Title extends PureComponent {
  /**Creates the tile and options for the graph. */

  state = {
    showColourPicker: false,
  };

  graphTitleOptions = () =>
    /**Title options for the current graph. */
    this.props.options[this.props.graphType].title;

  displayOption = () => (
    /**Returns the display checkbox. */
    <div>
      <label htmlFor="title-display-option">Show Title</label>
      <input
        type="checkbox"
        name="display-title"
        id="title-display-option "
        checked={this.graphTitleOptions().display}
        onChange={this.props.onToggleTitleDisplay}
      />
    </div>
  );

  text = () => (
    /**Returns the display text input box element. */
    <div>
      <label htmlFor="title-display-text">Display Text</label>
      <input
        type="input"
        name="display-text"
        id="title-display-text"
        placeholder="Display Text"
        value={this.graphTitleOptions().text}
        onChange={(event) => this.props.onUpdateText(event.target.value)}
      />
    </div>
  );

  position = () => (
    /**Set of options allowing the user to update the display position. */
    <div>
      <label htmlFor="title-display-position">Position</label>
      <select
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
    const fontSize = this.graphTitleOptions().fontSize;
    const options = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    const optionElems = options.map((optionElem) => (
      <option
        key={optionElem}
        value={optionElem}
        selected={optionElem === fontSize}
      >
        {optionElem}
      </option>
    ));

    return (
      <div>
        <label htmlFor="title-display-font-size">Size</label>
        <select
          onChange={(event) => this.props.onUpdateFontSize(+event.target.value)}
        >
          {optionElems}
        </select>
      </div>
    );
  };

  onColourChangeHandler = (colour) => {
    /**Change handler for when the user chooses a new colour. */
    const rgba = colour.rgb;

    document.addEventListener('click', this.onClickOutColourPicker, false);

    return this.props.onUpdateColour(
      `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
    );
  };

  onClickOutColourPicker = (event) => {
    if (!this.node.contains(event.target)) {
      this.setState({ showColourPicker: false });
      document.removeEventListener('click', this.onClickOutColourPicker, false);
      console.log('clicked outside');
    }
  };

  colour = () => {
    /**Options to change the title colour. */
    const currentColour = (
      <span
        className={classes.colour__current}
        style={{ backgroundColor: this.graphTitleOptions().fontColor }}
        onClick={() => this.setState({ showColourPicker: true })}
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
      <div className={classes.colour}>
        {currentColour}
        {colourPicker}
      </div>
    );
  };

  titleOptions = () => {
    /**Container with all the options an header which will show/hide the
     * based on the value of `this.props.showOptions`.
     */

    const headingText = this.props.showOptions
      ? 'Hide Title Options'
      : 'Show Title Options';

    const headingIcon = this.props.showOptions ? '+' : '-';

    const optionsStyle = this.props.showOptions ? null : { maxHeight: 0 };

    const options = (
      <div className={sharedClasses.options_container}>
        <h3
          className={sharedClasses.options_container__heading}
          onClick={this.props.onToggleShowOptions}
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

  // render() {
  //   return (
  //     <div>
  //       {this.displayOption()}
  //       {this.text()}
  //       {this.position()}
  //       {this.fontSize()}
  //       {this.colour()}
  //     </div>
  //   );
  // }

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
