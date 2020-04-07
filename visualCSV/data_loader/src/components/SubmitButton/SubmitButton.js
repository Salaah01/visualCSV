/**Upload button component which on click will post the data. */

import React from 'react';

const submitButton = (props) => (
  /**Upload button to post the data. */
  <button type="submit" disabled={props.disabled}>
    Upload
  </button>
);

export default submitButton;
