// IMPORTS
// Third Party Imports
import React, { Fragment, Component } from "react";
import Dropzone from "react-dropzone";
import csv from "csv";

// Local Imports
import Spinner from "../../../../sharedJsComponents/UI/spinners/spinner1/Spinner";
import classes from "./FileUploader.module.scss";

class FileUploader extends Component {
  state = {
    files: {},
  };

  onDropHandler = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      let status = "processing";
      this.setState({
        files: { ...this.state.files, [file.name]: 'processing' },
      });
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading failed");
      reader.onload = () => {
        this.readData(reader)
          .then((result) => {
            console.log("then block");
          })
          .catch((err) => {
            this.setState({ ...this.state.files, [file.name]: "error" });
          });
      };

      reader.readAsBinaryString(file);
      console.log(status);
      this.setState({
        files: { ...this.state.files, [file.name]: status },
      });
    });
  };

  readData = (reader) =>
    new Promise((resolve, reject) => {
      try {
        csv.parse(reader.result, (err, data) => {
          if (data) {
            resolve(data);
          } else {
            reject(console.log("failed to parse CSV", err));
          }
        });
      } catch (err) {
        reject(console.log("Unsupported file."));
      }
    });

  fileList = () => {
    /**Using the files object available in the state, builds a collection of
     * files and their respective icons depending on the current status of that
     * file.
     */

    const spinnerStyle = {
      margin: "0",
      marginRight: "10px",
      fontSize: "2px",
    };

    const filesWithIcons = [];

    const icons = {
      spinner: <Spinner style={spinnerStyle} />,
      error: (
        <div>
          <span>
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      ),
    };

    for (const file of Object.keys(this.state.files)) {
      switch (this.state.files[file]) {
        case "processing":
          filesWithIcons.push([icons.spinner, file]);
          break;

        case "error":
          filesWithIcons.push([icons.error, file]);
          break;

        default:
          filesWithIcons.push([spinner, file]);
      }
    }
    const fileListElems = filesWithIcons.map((items) => (
      <div className={classes.FileList__Item}>
        {items[0]}
        <p>{items[1]}</p>
      </div>
    ));

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

export default FileUploader;
