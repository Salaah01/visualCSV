// Third Party Imports
import React, { Component, Fragment } from 'react';

// Local Imports
import Tables from './containers/Tables/Tables';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>Graph Builder JS</h1>
        <Tables />
      </Fragment>
    );
  }
}
export default App;
