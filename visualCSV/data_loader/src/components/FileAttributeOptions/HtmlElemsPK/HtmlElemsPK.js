/**Component which gives user the option to set the primary for a given file.
 */

// IMPORTS
// Third Party Imports
import React from 'react';

// Local Imports
import { CONTENT_FOR_FILE_PK_NAME } from '../../../constants';

const htmlElemsPK = (props) => {
  /**Creates a set of form elements which hte user can interact with to the
   * primary keys for their table.
   * Args:
   *  props.file: (object) A file object with a `header` (arr) property.
   */

  const onClickHandler = (header) => {
    /**When a radio button is clicked, update the data element which will
     * yield information on the primary key.
     */
    document.getElementById(
      `data-primary-key__${props.fileID}`,
    ).innerText = JSON.stringify({
      [props.fileID]: header,
    });
  };

  const singlePKRadioBtn = (singleHeader, fileID) => {
    /**A single radio button element which will be used to identify which
     * header is the primary key.
     * Args:
     *  singleHeader: (str) Header name.
     *  fileID: (any) the file ID.
     */

    return (
      <div key={fileID}>
        <label htmlFor={`${props.fileID}_${singleHeader}`}>
          {singleHeader}
        </label>
        <input
          type="radio"
          id={`${props.fileID}_${singleHeader}`}
          name={props.fileID}
          heading={singleHeader}
          value={singleHeader}
          contentfor={CONTENT_FOR_FILE_PK_NAME}
          onClick={() => onClickHandler(singleHeader)}
        />
      </div>
    );
  };

  const PKRadioBtns = () => {
    /**A collection of radio buttons for each heading which will be used to
     * derive the primary kwy.
     * Args:
     *  key: (any) Unique class key.
     */
    let radioBtns = null;
    if (props.file.header) {
      radioBtns = props.file.header.map((head, idx) =>
        singlePKRadioBtn(head, idx),
      );
    }

    return <div>{radioBtns}</div>;
  };

  const dataElem = () => {
    /**A html element which will store the name of the heading which will
     * become the primary key.
     * Will begin as an empty value, but can be updated interacting with the
     * radio buttons.
     */
    return (
      <p
        id={`data-primary-key__${props.fileID}`}
        contents="data-primary-key"
        file={props.fileID}
      ></p>
    );
  };

  return (
    <div key={props.fileID}>
      {dataElem()}
      {PKRadioBtns()}
    </div>
  );
};

export default htmlElemsPK;
