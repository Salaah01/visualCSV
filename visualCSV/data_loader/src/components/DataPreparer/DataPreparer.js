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
  fileHeadersElem = (fileId, index) => {
    /**Creates set of form elements for a file. For each header of a given file
     * the method will create a label and input where the user will be able to
     * change the field type (pre-populated) for each heading.
     *
     * Args:
     *  fileId: The file ID for a file.
     *  index: A unique index property to be set as the key for the returning
     *    div.
     */
    const file = this.props.files[fileId];
    // Ensure that all of the properties have been loaded onto the store before
    // accessing.
    if (
      file.status === fileStates.PARSING_CSV_SUCCESS &&
      file.fieldTypes &&
      file.header
    ) {
      const headerElems = [];
      for (let headIdx = 0; headIdx < file.header.length; headIdx++) {
        const fieldTypeOpts = new Set(['string', 'number', 'date']);

        const headerId = `${file.id}_${headIdx}`;

        headerElems.push(
          <div key={headerElems.length}>
            <label htmlFor={headerId}>{file.header[headIdx]}</label>
            <select id={headerId}>
              <option
                value="string"
                selected={file.fieldTypes[headIdx] === 'string'}
              >
                String
              </option>
              <option
                value="number"
                selected={file.fieldTypes[headIdx] === 'number'}
              >
                Number
              </option>
              <option
                value="date"
                selected={file.fieldTypes[headIdx] === 'date'}
              >
                Date
              </option>
            </select>
          </div>,
        );
      }
      return (
        <div id={`headers_${fileId}`} key={index}>
          {headerElems}
        </div>
      );
    } else {
      return null;
    }
  };

  allFileHeadersElems = () => {
    //**Returns a collection of input elements for each file. */
    const fileInputElems = Object.keys(this.props.files)
      .filter(
        (fileId) =>
          this.props.files[fileId].header !== null &&
          this.props.files[fileId].header !== undefined,
      )
      .map((fileId, index) => this.fileHeadersElem(fileId, index));

    return <div>{fileInputElems}</div>;
  };

  render() {
    return <div>{this.allFileHeadersElems()}</div>;
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
