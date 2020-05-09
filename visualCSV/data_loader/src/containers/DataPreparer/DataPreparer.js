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
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DjangoCSRFToken from 'django-react-csrftoken';

// Local Imports
import * as actions from '../../store/actions';
import { fileStates } from '../../store/reducers/filesInfo';
import classes from './DataPreparer.module.scss';
import PostDataElem from '../../components/PostDataElem/PostDataElem';
import HeaderAttributes from '../../components/FileAttributeOptions/HeaderAttributes/HeaderAttributes';
import { CONTENT_FOR_FILE_PK_NAME } from '../../constants';
import Spinner from '../../../../shared_js_components/UI/spinners/spinner1/Spinner';

class DataPreparer extends Component {
  /**Main container for preparing the data before it can be transmitted. This
   * also includes allowing the user to define any primary and foreign keys
   * before posting the data to the server.
   */
  fileIDs = () => Object.keys(this.props.files);

  state = {
    postData: false,
    preparingData: false,
    prepared: false,
    data: null,
  };

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

  headerAttributes = () =>
    /**Loads elements allowing user to select primary and foreign key for each
     * uploaded CSV.
     */
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

  submitBtnOnClickHandler = () => {
    /**When the submit button is clicked, load the data ready to be submitted
     * and send across the data.
     */
    const getPostData = new Promise((resolve, reject) => {
      resolve(<PostDataElem files={this.props.files} />);
      reject('error in getting post data.');
    });

    this.props.onFilesNotReadyToUpload();
    this.setState({ preparingData: true });

    console.log('preparing state');
    getPostData.then((result) => {
      this.setState({ data: result, preparingData: false, prepared: true });
      document.getElementById('submit-post-data').click();
    });
  };

  clientSubmitBtn = () => {
    /**The client facing submit button. This will be largely presentational
     * indicating that either everything is ready to upload or there is still
     * some on going process in the background.
     */
    let loadingIcon = null;
    const filesLen = Object.keys(this.props.files).length;
    if (
      filesLen &&
      (!this.props.filesReadyToUpload || this.state.preparingData)
    ) {
      loadingIcon = <Spinner />;
    }
    return (
      <Fragment>
        <button
          type="reset"
          disabled={filesLen === 0}
          onClick={this.submitBtnOnClickHandler}
          className={`btn btn--primary ${classes.btn}`}
        >
          {loadingIcon}Upload Now
        </button>

        <button
          type="submit"
          style={{ display: 'none' }}
          id="submit-post-data"
        />
      </Fragment>
    );
  };

  render() {
    const PKInfoElems = document.querySelectorAll(
      `[contentfor=${CONTENT_FOR_FILE_PK_NAME}]`,
    );

    for (const PKInfoElem of PKInfoElems) {
      PKInfoElem.addEventListener('click', () => {
        this.setState({ dummyCounter: Math.random() });
      });
    }

    return (
      <div>
        <form method="POST">
          <div id="csrf">
            <DjangoCSRFToken />
          </div>
          {this.clientSubmitBtn()}
          {this.state.data}
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
