/**A single column element. */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

// Local Imports
import classes from './Column.module.scss';

class Column extends Component {
  state = {
    showColourPicker: false,
  };

  removeBtn = () => {
    /**Renders a remove button (X inside a span) which when clicked with move
     * the column back to the tables.
     */
    if (this.props.removeBtn) {
      return (
        <span
          className={classes.column__remove_btn}
          onClick={this.props.onMoveColumnToTables}
        >
          X
        </span>
      );
    }
  };

  onClickOutColourPicker = (event) => {
    /**Click handler for when the user clicks outside the colour picker. WIll
     * case the colour picker to close.
     */
    if (!this.node.contains(event.target)) {
      this.setState({ showColourPicker: false });
      this.props.onAllowDrag();
      document.removeEventListener('click', this.onClickOutColourPicker, false);
    }
  };

  onColourPicker = () => {
    /**Click handler for whe nn the user clicks on the colour span which will
     * open the colour picker as well as watch for an action where the user
     * clicks out.
     */
    this.setState({ showColourPicker: true });
    this.props.onPreventDrag();
    document.addEventListener('click', this.onClickOutColourPicker, false);
  };

  updateColourHandler = (colour) => {
    /**Dispatches an action to the redux store to update the colour of the
     * dataset.
     * colour: (obj) Colour object returned from 'react-color'.
     */
    this.props.onUpdateDataSetColour(this.props.columnID, colour.rgb);
  };

  colour = () => {
    /**Renders a span element on the column which when clicked will allow the
     * user to change the dataset colour.
     */
    if (
      this.props.showColour &&
      this.props.dataSet &&
      this.props.section === 'legends'
    ) {
      const currentColour = (
        <span
          className={classes.colour__current}
          style={{
            backgroundColor: this.props.dataSet.backgroundColor,
          }}
          onClick={(event) => this.onColourPicker(event)}
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
              color={this.props.dataSet.backgroundColor}
              onChangeComplete={(colour) => this.updateColourHandler(colour)}
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
    }
  };

  render() {
    const name = <p className={classes.column__name}>{this.props.name}</p>;
    // Colour Picker
    return (
      <div className={classes.column}>
        {this.colour()}
        {name}
        {this.removeBtn()}
      </div>
    );
  }
}

export default Column;
