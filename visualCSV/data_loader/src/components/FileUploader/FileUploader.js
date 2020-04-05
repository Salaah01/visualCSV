// IMPORTS
// Third Party Imports
import React, { Fragment, Component } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import { connect } from 'react-redux';

// Local Imports
import Spinner from '../../../../sharedJsComponents/UI/spinners/spinner1/Spinner';
import classes from './FileUploader.module.scss';
import * as actions from '../../store/actions';
import { fileStates } from '../../store/reducers/filesInfo';

class FileUploader extends Component {
  // TODO: Is the state even needed?
  state = {
    // As it is possible  that a user may attempt import a file with the same
    // name but from different directory, a id for each file needs to be
    // established.
    files: {},
  };

  onDropHandler = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const fileId = ` ${file.size}x__${file.name}`;
      this.setState(
        (prevState) => ({
          files: { ...prevState.files },
          [prevState.currentId + 1]: {
            name: file.name,
          },
        }),
        () => this.props.onNewFileUploadStart(fileId, file.name),
      );

      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading failed');
      reader.onload = () => {
        this.readData(reader)
          .then((result) => {
            this.props.onNewFileUploadSuccess(fileId, result);
            this.props.onSplitParsedData(fileId)
          })
          .catch((err) => {
            this.setState({ ...this.state.files, [file.name]: 'error' });
            this.props.onNewFileUploadFail(fileId);
          });
      };

      reader.readAsBinaryString(file);
      // console.log(status);
      // this.setState({
      //   files: { ...this.state.files, [file.name]: status },
      // });
    });
  };

  readData = (reader) =>
    new Promise((resolve, reject) => {
      try {
        csv.parse(reader.result, (err, data) => {
          if (data) {
            console.log(data);
            resolve(data);
          } else {
            reject(console.log('failed to parse CSV', err));
          }
        });
      } catch (err) {
        reject(console.log('Unsupported file.'));
      }
    });

  fileList = () => {
    /**Using the files object available in the state, builds a collection of
     * files and their respective icons depending on the current status of that
     * file.
     */

    const spinnerStyle = {
      margin: '0',
      marginRight: '10px',
      fontSize: '2px',
    };

    const filesWithIcons = [];

    const icons = {
      spinner: <Spinner style={spinnerStyle} />,
      success: (
        <div className={classes.Content__Success}>
          <span className={`${classes.Icon} ${classes.Icon__Success}`}>
            <i className="fas fa-check"></i>
          </span>
        </div>
      ),
      error: (
        <div className={classes.Content__Error}>
          <span className={`${classes.Icon} ${classes.Icon__Error}`}>
            <i className="fas fa-exclamation"></i>
          </span>
        </div>
      ),
    };

    for (const file of Object.keys(this.props.files)) {
      const fileName = this.props.files[file].name;

      switch (this.props.files[file].status) {
        case fileStates.PARSING_CSV_IN_PROGRESS:
          filesWithIcons.push([icons.spinner, <p>{fileName}</p>]);
          break;

        case fileStates.PARSING_CSV_SUCCESS:
          filesWithIcons.push([
            icons.success,
            <p className={classes.Content__Success}>{fileName}</p>,
          ]);
          break;

        case fileStates.PARSING_CSV_FAIL:
          filesWithIcons.push([
            icons.error,
            <p className={classes.Content__Error}>{fileName}</p>,
          ]);
          break;

        default:
          console.log('default');

          filesWithIcons.push([icons.spinner, <p>{fileName}</p>]);
      }
    }

    const fileListElems = filesWithIcons.map((items) => (
      <div className={classes.FileList__Item}>
        {items[0]}
        {items[1]}
      </div>
    ));

    // const fileListElems = Object.keys(this.props.files).map((file) => (
    //   <div className={classes.FileList__item}>
    //     {this.props.files[file].name}
    //   </div>
    // ));

    return <div className={classes.FileList}>{fileListElems}</div>;
  };

  render() {
    return (
      <Fragment>
        <Dropzone onDrop={this.onDropHandler}>
          {({ getRootProps, getInputProps }) => (
            <section className={classes.Dropzone}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        {this.fileList()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.filesInfo.files,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewFileUploadSuccess: (id, data) =>
      dispatch(actions.newFileUploadSuccess(id, data)),
    onNewFileUploadFail: (id) => dispatch(actions.newFileUploadFail(id)),
    onNewFileUploadStart: (id, name) =>
      dispatch(actions.newFileUploadStart(id, name)),
    onSplitParsedData: (id) => dispatch(actions.splitParsedData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
