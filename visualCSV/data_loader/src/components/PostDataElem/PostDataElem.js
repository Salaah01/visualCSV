/**The HTML element which will contain the data to be posted. */

// IMPORTS
// Third Party Imports
import React from 'react';

// Local Imports
import { convertFilesDataToJson } from '../../functions';
import { CONTENT_FOR_FILE_PK_NAME } from '../../constants';

const postDataElem = (props) => {
  const getData = () => {
    return JSON.stringify(convertFilesDataToJson(props.files));
  };

  // Whenever user clicks on any of the PK radio buttons, reload the data.
  const PKInfoElems = document.querySelectorAll(
    `[contentfor=${CONTENT_FOR_FILE_PK_NAME}]`,
  );

  for (const PKInfoElem of PKInfoElems) {
    PKInfoElem.addEventListener('onchange', () => {
      getData();
    });
  }

  return (
    <textarea
      id="post-data"
      name="post-data"
      style={{ display: 'none' }}
      value={JSON.stringify(convertFilesDataToJson(props.files))}
    />
  );
};

export default postDataElem;
