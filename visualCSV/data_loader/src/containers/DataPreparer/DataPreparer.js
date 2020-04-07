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
import DjangoCSRFToken from 'django-react-csrftoken';

// Local Imports
import * as actions from '../../store/actions';
import { fileStates } from '../../store/reducers/filesInfo';
import classes from './DataPreparer.module.scss';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import HtmlElemsPK from '../../components/FileAttributeOptions/HtmlElemsPK/HtmlElemsPK';

class DataPreparer extends Component {
  componentDidUpdate() {
    /**Evaluate if files are ready to be uploaded. */
    if (
      !Object.keys(this.props.files).length &&
      this.props.filesReadyToUpload
    ) {
      this.props.onFilesNotReadyToUpload();
    } else if (
      // If any of the files are still processing, then disable the button.
      Object.keys(this.props.files).filter(
        (fileId) =>
          this.props.files[fileId].status ===
          fileStates.PARSING_CSV_IN_PROGRESS,
      ).length
    ) {
      if (this.props.filesReadyToUpload) {
        this.props.onFilesNotReadyToUpload();
      }
    } else {
      if (!this.props.filesReadyToUpload) {
        this.props.onFilesReadyToUpload();
      }
    }
  }

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
        const headerId = `${fileId}_${headIdx}`;

        headerElems.push(
          <div
            key={headerElems.length}
            file={fileId}
            className={classes.FileHeadings__Heading}
          >
            <label
              htmlFor={headerId}
              className={classes.FileHeadings__Heading__Label}
            >
              {file.header[headIdx]}
            </label>
            <select
              id={headerId}
              col={headIdx}
              className={classes.FileHeadings__Heading__Select}
              name={`${fileId}[${file.header[headIdx]}]`}
            >
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
        <div
          id={`headers_${fileId}`}
          key={index}
          className={classes.FileHeadings}
          file={fileId}
        >
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

    return <form encType="application/json">{fileInputElems}</form>;
  };

  jsonFilesData = () => {
    /**Stringified JSON which contains data to be passed to the server. The
     * following structure will be created (a single file):
     * {
     *   file_id1: {
     *     table_data: [{
     *       col1: {
     *         field_type: string,
     *         contents: [1, 2, 4, 5, 6 7]
     *       }
     *     ]},
     *     primary_key: primary_key_field_name,
     *     foreign_keys: [{
     *      field1: table_name,
     *      field2: table_name
     *     }]
     *   }
     * }
     */

    const jsonResponse = {};
    const fileIds = Object.keys(this.props.files);
    for (const fileId of fileIds) {
      const file = this.props.files[fileId];
      // Level 1.
      jsonResponse[fileId] = {};

      // Level 2
      jsonResponse[fileId].table_data = [];

      const primaryKeyElem = document.getElementById(
        `data-primary-key__${fileId}`,
      );
      let primaryKey;
      if (primaryKeyElem && primaryKeyElem.innerText) {
        primaryKey = JSON.parse(primaryKeyElem.innerText);
      } else {
        primaryKey = '';
      }
      jsonResponse[fileId].primary_key = primaryKey;
      jsonResponse[fileId].foreign_keys = [];

      // Level 3 - table data
      const headerLen = file.header ? file.header.length : 0;
      for (let headIdx = 0; headIdx < headerLen; headIdx++) {
        // Prepare the contents (level 5)
        const contents = [];
        const contentLen = file.content ? file.content.length : 0;
        for (let row = 0; row < contentLen; row++) {
          contents.push(file.content[row][headIdx]);
        }

        jsonResponse[fileId].table_data.push({
          // Level 4 - column
          [file.header[headIdx]]: {
            // Level 5 - field type
            fieldType: file.fieldTypes ? file.fieldTypes[headIdx] : '',
            // Level 5 - contents
            contents: contents,
          },
        });
      }
    }
    return (
      <textarea
        name="post-data"
        id="post-data"
        readOnly
        value={JSON.stringify(jsonResponse)}
      />
    );
  };

  singlePKAndFKElem = (fileID) => {
    return <HtmlElemsPK file={this.props.files[fileID]} fileID={fileID} />;
  };

  allPKAndFkElems = () => {
    let htmlElems = null;
    const fileIDs = Object.keys(this.props.files);
    if (fileIDs.length) {
      htmlElems = fileIDs.map((fileID) => this.singlePKAndFKElem(fileID));
    }
    return htmlElems;
  };

  render() {
    // TODO: Build this.allFileHeadersElems() and allow on change. There is a
    // core functions that will help with revalidating the fields.

    return (
      <div>
        <form method="POST">
          <div id="csrf">
            <DjangoCSRFToken />
          </div>
          <SubmitButton disabled={!this.props.filesReadyToUpload} />
          {this.jsonFilesData()}
          {this.allPKAndFkElems()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.filesInfo.files,
    filesReadyToUpload: state.filesInfo.filesReadyToUpload,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilesReadyToUpload: () => dispatch(actions.filesReadyToUpload()),
    onFilesNotReadyToUpload: () => dispatch(actions.filesNotReadyToUpload()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreparer);
