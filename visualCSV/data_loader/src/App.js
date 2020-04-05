// Third Party Imports
import React, { Component, Fragment } from 'react';

// Local Imports
import FileUploader from './components/FileUploader/FileUploader';
import DataPreparer from './components/DataPreparer/DataPreparer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <FileUploader />
        <DataPreparer />
      </Fragment>
    );
  }
}
export default App;
