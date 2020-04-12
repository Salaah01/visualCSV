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
import PostDataElem from '../../components/PostDataElem/PostDataElem';
import HeaderAttributes from '../../components/FileAttributeOptions/HeaderAttributes/HeaderAttributes';
import { CONTENT_FOR_FILE_PK_NAME } from '../../constants';

class DataPreparer extends Component {
  state = {
    dummyCounter: 0,
  };

  fileIDs = () => Object.keys(this.props.files);

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

  headerAttributes = () =>
    this.fileIDs().map((fileID) => (
      <HeaderAttributes
        file={this.props.files ? this.props.files[fileID] : null}
        tables={this.props.tables}
        fileID={fileID}
        setPrimaryKey={this.props.onSetPrimaryKey}
        setForeignKey={this.props.onSetForeignKey}
        removeForeignKey={this.props.onRemoveForeignKey}
      />
    ));

  render() {
    // TODO: Build this.allFileHeadersElems() and allow on change. There is a
    // core functions that will help with revalidating the fields.

    const PKInfoElems = document.querySelectorAll(
      `[contentfor=${CONTENT_FOR_FILE_PK_NAME}]`,
    );

    for (const PKInfoElem of PKInfoElems) {
      PKInfoElem.addEventListener('click', () => {
        this.setState({ dummyCounter: Math.random() });
      });
    }

    let postDataElem = null;
    return (
      <div>
        <form method="POST">
          <div id="csrf">
            <DjangoCSRFToken />
          </div>
          <SubmitButton disabled={!this.props.filesReadyToUpload} />
          {this.allPKAndFkElems()}
          <PostDataElem files={this.props.files} />
        </form>
        {this.headerAttributes()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.filesInfo.files,
    filesReadyToUpload: state.filesInfo.filesReadyToUpload,
    tables: state.filesInfo.tables,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilesReadyToUpload: () => dispatch(actions.filesReadyToUpload()),
    onFilesNotReadyToUpload: () => dispatch(actions.filesNotReadyToUpload()),
    onSetPrimaryKey: (id, pk) => dispatch(actions.setPrimaryKey(id, pk)),
    onSetForeignKey: (id, header, fk) =>
      dispatch(actions.setForeignKey(id, header, fk)),
    onRemoveForeignKey: (id, header) =>
      dispatch(actions.removeForeignKey(id, header)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataPreparer);
