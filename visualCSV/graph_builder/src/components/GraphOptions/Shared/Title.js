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
    console.log(this.props.options[this.props.graphType].title.display);
    if (this.props.options[this.props.graphType].title.display) {
      this.props.onSetTitleDisplayFalse();
    } else {
      this.props.onSetTitleDisplayTrue();
    }
  };

  display = () => (
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
    onSetTitleDisplayTrue: () => dispatch(actions.setTitleDisplayTrue()),
    onSetTitleDisplayFalse: () => dispatch(actions.setTitleDisplayFalse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
