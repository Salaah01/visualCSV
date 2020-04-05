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
  state = {
    // As it is possible  that a user may attempt import a file with the same
    // name but from different directory, a id for each file needs to be
    // established.
    files: {},
    currentId: 1,
  };

  onDropHandler = (acceptedFiles) => {
    const fileId = this.state.currentId
    acceptedFiles.forEach((file) => {
      this.setState(
        (prevState) => ({
          files: { ...prevState.files },
          [prevState.currentId + 1]: {
            name: file.name,
          },
          currentId: prevState.currentId + 1,
        }),
        () => this.props.onCSVParseStart(`${file.size}_${file.name}`, file.name),
      );

      // this.setState({
      //   files: { ...this.state.files, [file.name]: 'processing' },
      // });

      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading failed');
      reader.onload = () => {
        this.readData(reader)
          .then((result) => {
            console.log('then block');
            this.props.onCSVParseSuccess(`${file.size}_${file.name}`);
          })
          .catch((err) => {
            this.setState({ ...this.state.files, [file.name]: 'error' });
            this.props.onCSVParseFail(`${file.size}_${file.name}`);
          });
      };

      reader.readAsBinaryString(file);
      // console.log(status);
      // this.setState({
      //   files: { ...this.state.files, [file.name]: status },
      // });
    });

    // this.props.onCSVParseStart('abs');
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
      error: (
        <div>
          <span>
            <i class="fas fa-times"></i>
          </span>
        </div>
      ),
    };

    for (const file of Object.keys(this.props.files)) {
      switch (this.props.files[file].status) {
        case fileStates.PARSING_CSV_IN_PROGRESS:
          filesWithIcons.push([icons.spinner, this.props.files[file].name]);
          console.log('csv in progress  case');

          break;

        case fileStates.PARSING_CSV_FAIL:
          filesWithIcons.push([icons.error, this.props.files[file].name]);
          break;

        default:
          console.log('default');

          filesWithIcons.push([icons.spinner, this.props.files[file].name]);
      }
    }

    for (const fileId of Object.keys(this.props.files)) {
    }

    console.log('fileswithicons', filesWithIcons);

    const fileListElems = filesWithIcons.map((items) => (
      <div className={classes.FileList__Item}>
        {items[0]}
        <p>{items[1]}</p>
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
    onTryParseCSV: (id, name) => dispatch(actions.parseCSV(id, name)),
    onCSVParseSuccess: (id) => dispatch(actions.newFileParseSuccess(id)),
    onCSVParseFail: (id) => dispatch(actions.newFileParseFail(id)),
    onCSVParseStart: (id, name) =>
      dispatch(actions.attemptUploadNewFile(id, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
