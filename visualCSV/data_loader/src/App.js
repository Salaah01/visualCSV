// Third Party Imports
import React, { Component, Fragment } from "react";

// Local Imports
import FileUploader from './components/FileUploader'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>App.js</h1>
        <FileUploader />
      </Fragment>
    );
  }
}

export default App;
