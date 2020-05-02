/**The title option in the graph options. */

// IMPORTS
// Third Party Import
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Local Imports
import * as actions from '../../../store/actions';

class Title extends PureComponent {
  /**Creates the tile and options for the graph. */

  handleDisplayChange = () => {
    /**On change handler for the display checkbox. */
    if (this.props.options[this.props.graphType].title.display) {
      this.props.onSetTitleDisplayFalse();
    } else {
      this.props.onSetTitleDisplayTrue();
    }
  };

  display = () => (
    /**Returns the display checkbox. */
    <div>
      <label for="title-display-option">Display Title</label>
      <input
        type="checkbox"
        name="display-title"
        id="title-display-option "
        checked={this.props.options[this.props.graphType].title.display}
        onChange={this.handleDisplayChange}
      />
    </div>
  );

  render() {
    return <div>{this.display()}</div>;
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
    onSetTitleDisplayTrue: () => dispatch(actions.toggleTitleDisplay()),
    onSetTitleDisplayFalse: () => dispatch(actions.toggleTitleDisplay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
