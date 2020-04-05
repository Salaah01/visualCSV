/**Component renders an element for each file successfully uploaded along with
 * each file's headers and field types. The user will have the opportunity to
 * update field types and delete any files.
 *
 * Once the user is ready and once a final set of validation has taken place,
 * the user will be able to submit their CSVs which will send the data to the
 * server.
 */

// IMPORTS
// Third Party Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Local Imports
import * as actions from '../../store/actions';
import { fileStates } from '../../store/reducers/filesInfo';

class DataPreparer extends Component {
  fileHeadersElem = (fileId) => {
    const file = this.props.files[fileId];
    if ((file.status = fileStates.PARSING_CSV_SUCCESS)) {
      const headerElems = [];
      for (let headIdx = 0; headers < file.headers.length; headIdx++) {
        const headerId = `${file.id}_${headIdx}`;
        headerElems.push(
          <div>
            <label for={headerId}>{header}</label>
            <input
              type="text"
              name={headerId}
              value={file.fieldTypes[headIdx]}
            />
          </div>,
        );
      }
    } else {
      return null;
    }
  };

  render() {
    return <h1>DataPreparer</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.filesInfo.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreparer);
