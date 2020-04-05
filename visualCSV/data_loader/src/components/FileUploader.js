import React, {Fragment, Component } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import csv from "csv";

class FileUploader extends Component {
  state = {
    files: [],
  };

  onDropHandler = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading failed");
    reader.onload = () => {
      // Parse CSV file
      csv.parse(reader.result, (err, data) => {
        console.log("Parsed CSV data: ", data);
      });
    };
    // read file contents
    acceptedFiles.forEach((file) => {
      reader.readAsBinaryString(file);
      this.setState({ files: [...this.state.files, file.name] });
    });
  };

  render() {
    return (
      <Fragment>
        <Dropzone onDrop={this.onDropHandler}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <ul>
          {this.state.files.map((file) => (
            <li>{file}</li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default FileUploader;
